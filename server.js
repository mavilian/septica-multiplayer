const path=require("path");
const express=require("express");
const game=require("./src/game");

const app=express();
const rooms=new Map();

app.disable("x-powered-by");
app.use(express.json({limit:"32kb"}));
app.use(express.static(path.join(__dirname,"public"),{etag:false,maxAge:0}));

function makeCode(){
  const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let c;
  do c=Array.from({length:5},()=>chars[Math.floor(Math.random()*chars.length)]).join("");
  while(rooms.has(c));
  return c;
}

function publicState(r,p){
  const s=r.state;
  return {room:r.code,player:p,players:r.players.map(Boolean),status:s.status,round:s.round,game:s.game,small:[...s.small],big:[...s.big],roundDouble:s.roundDouble,roundResult:s.roundResult,gameResult:s.gameResult,deck:s.deck.length,hand:[...s.hands[p]],opponentCount:s.hands[1-p].length,sequence:[...s.sequence],starter:s.starter,lastAction:s.lastAction,turn:s.turn,pileCounts:[s.piles[0].length,s.piles[1].length],pilePoints:[game.points(s.piles[0]),game.points(s.piles[1])],log:r.log.slice(-100)};
}

function addLog(r,t){r.log.push(t);if(r.log.length>120)r.log.shift()}
function ensureStarted(r){
  if(r.players[0]&&r.players[1]&&r.state.status==="waiting"){
    game.startRound(r.state);
    addLog(r,"========== RUNDA "+r.state.round+" ==========");
    addLog(r,"A: 4 cărți | B: 4 cărți | Pachet: 24");
    addLog(r,r.state.turn===0?"A începe runda.":"B începe runda.");
  }
}
function getRoom(req,res){
  const code=String(req.params.code||"").trim().toUpperCase();
  const r=rooms.get(code);
  if(!r){res.status(404).json({error:"Camera nu există."});return null;}
  ensureStarted(r);return r;
}

app.get("/api/health",(req,res)=>res.json({ok:true,transport:"http-polling",rooms:rooms.size}));
app.post("/api/rooms",(req,res)=>{
  const code=makeCode();
  const r={code,players:[true,false],state:game.newState(),log:[]};
  rooms.set(code,r);
  res.json({ok:true,code,player:0,state:publicState(r,0)});
});
app.post("/api/rooms/:code/join",(req,res)=>{
  const r=getRoom(req,res);if(!r)return;
  if(r.players[1])return res.status(409).json({error:"Camera este plină."});
  r.players[1]=true;ensureStarted(r);
  res.json({ok:true,code:r.code,player:1,state:publicState(r,1)});
});
app.post("/api/rooms/:code/reconnect",(req,res)=>{
  const r=getRoom(req,res);if(!r)return;
  const p=Number(req.body&&req.body.player);
  if(p!==0&&p!==1)return res.status(400).json({error:"Jucător invalid."});
  r.players[p]=true;ensureStarted(r);
  res.json({ok:true,code:r.code,player:p,state:publicState(r,p)});
});
app.get("/api/rooms/:code/state",(req,res)=>{
  const r=getRoom(req,res);if(!r)return;
  const p=Number(req.query.player);
  if((p!==0&&p!==1)||!r.players[p])return res.status(400).json({error:"Jucător invalid."});
  res.json({ok:true,state:publicState(r,p)});
});
app.post("/api/rooms/:code/action",(req,res)=>{
  const r=getRoom(req,res);if(!r)return;
  const p=Number(req.body&&req.body.player);
  const action=String((req.body&&req.body.action)||"");
  if(p!==0&&p!==1)return res.status(400).json({error:"Jucător invalid."});
  if(!r.players[p])return res.status(409).json({error:"Jucătorul nu este în cameră."});
  try{
    if(action==="play_card"){
      const card=String((req.body&&req.body.card)||"");
      const result=game.playCard(r.state,p,card);
      const who=p?"B":"A";
      if(result.kind==="start")addLog(r,who+" începe secvența cu "+result.card+".");
      else if(result.kind==="continue")addLog(r,who+" răspunde cu "+result.card+" — continuă secvența.");
      else{addLog(r,who+" răspunde cu "+result.card+" — cedează prin carte.");addLog(r,(result.winner?"B":"A")+" câștigă secvența.");}
    }else if(action==="take"){
      const result=game.take(r.state,p);
      addLog(r,(p?"B":"A")+" spune: „Ia-le”.");
      addLog(r,(result.winner?"B":"A")+" câștigă secvența: "+result.sequence.join(" → "));
    }else if(action==="next_round"){
      if(p!==0)throw Error("NOT_ALLOWED");
      game.nextRound(r.state);
      addLog(r,"========== RUNDA "+r.state.round+" ==========");
      addLog(r,"A: 4 cărți | B: 4 cărți | Pachet: 24");
      addLog(r,r.state.turn===0?"A începe runda.":"B începe runda.");
    }else throw Error("UNKNOWN_ACTION");
    ensureStarted(r);
    res.json({ok:true,state:publicState(r,p)});
  }catch(e){res.status(400).json({error:e.message||"Acțiune invalidă."});}
});

app.use((req,res)=>{
  if(req.path.startsWith("/api/"))return res.status(404).json({error:"API route not found."});
  res.sendFile(path.join(__dirname,"public","index.html"));
});

const port=Number(process.env.PORT)||3000;
app.listen(port,"0.0.0.0",()=>console.log("Șeptică HTTP multiplayer listening on "+port));
