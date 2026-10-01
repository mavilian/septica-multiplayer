const path=require("path"),express=require("express"),http=require("http"),{Server}=require("socket.io"),game=require("./src/game");
const app=express(),server=http.createServer(app),io=new Server(server),rooms=new Map();\napp.disable("x-powered-by");\napp.use((req,res,next)=>{if(req.path==="/"||req.path.endsWith(".html"))res.set("Cache-Control","no-store, no-cache, must-revalidate, proxy-revalidate");next()});\napp.use(express.static(path.join(__dirname,"public"),{etag:false,maxAge:0}));
function code(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let x;do{x=Array.from({length:5},()=>c[Math.floor(Math.random()*c.length)]).join("")}while(rooms.has(x));return x}
function room(s){return s.data.room?rooms.get(s.data.room):null}
function pub(r,p,lastAction=r.state.lastAction){
  const s=r.state;

  return {
    room:r.code,
    player:p,
    players:r.players.map(Boolean),

    status:s.status,
    round:s.round,
    game:s.game,