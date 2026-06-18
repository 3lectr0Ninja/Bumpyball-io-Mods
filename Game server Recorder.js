let Rec=window.Rec=[]
let counter = null
function save(data) {
    let compressed = pako.deflate(JSON.stringify(data));
  const blob = new Blob([compressed],{ type: "application/octet-stream" });
 
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = server.host + server.port + ".dat";
  a.click();
}
let server = {
    client:{},
    rec:false,
    t:null,
    p:null,
    o:null,
    l:null,
    s:null,
    count:0,
    state:null,
    time:300,
    port:null,
    onmessage(j){
        let arr = new Uint8Array(new BR([]).Mencoder(j))
        const m = new Blob([arr], { type: "" });
        const msg = new MessageEvent(this.t, {
               data: m,
               ports: this.p,
               origin: this.o,
               lastEventId: this.l,
               source: this.s,
            })
           this.ws.om(msg);
    },
}
let ServerPacketHandler = {
    PacketSplitter(j){
        for (let b in j) {
        let _j = j[b]
        this.HandlePackets(_j)
        }
    },
    HandlePackets(j){
        let d=j[18][2]
        let PID =j[8][2]
        let p
        let l
        let c
        switch(PID){
            case 2:
            p = d[18][2][10][2]
            l = p.length
            c = p[l-1]
            this.hanleclient(c)
            server.players=p
            server.playerdetails=[]
            p.forEach(i=>{this.handleplayers(i)})
            server.entities=[]
            d[10][2][10][2].forEach(i=>{
                this.handleentites(i)
                let id = i[18][2][24][2]
                server.playerdetails.forEach(e=>{
             if(e.id==id){
             e.eid = i[8][2]
             }
         })
            })
                server.time = Math.floor(d[34][2][13][2])
                server.state= d[34][2][24][2]
                server.host = d[42][2]
                break;
            case 3:
              p = d[10][2]
             p.forEach(i=>{this.handleplayers(i)})
             server.players.push(p[0])
                break;
            case 4:
                delete server.playerdetails[(d[8][2])]
                break;
            case 8:
                if(true){
                    let js = {...d}
                    js[8]=d[16];delete js[16]
                    js[18]=d[26];delete js[26]
                    this.handleentites(js)
                }
                break;
            case 9:
                delete server.entities[d[8][2]]
                break;
            case 12:
                server.time = Math.floor(d[13][2])
                server.state=d[24][2]
                if(server.state==5){
                    server.rec=false
                    server.time=300
                    Rec[Rec.length-1][server.count]= [{0:j},0]
                    server.count+=1
                    let dat = Rec[Rec.length-1]
                    save(dat)
                    Rec[Rec.length]={}
                    server.count = 1
                }
                if(server.state==0){
                    let nj={
        8:  ["PacketId","int",2],
        18: ["Data","dict",{
        10: ["entities", "dict", {
            10: ["list", "arr", this.gete()],
        }],
        18: ["players", "dict", {
            10: ["list", "arr", this.getp()]
        }],
        24: ["playerId", "uint",server.client.pid+500],
        34: ["gameState", "dict", {
            13: ["timeRemaining", "float",300],
            18: ["teams", "arr", [{
                8: ["teamId", "int",0],
                16: ["score", "int",0],
            },{
                8: ["teamId", "int",1],
                16: ["score", "int",0],
            }]],
            24: ["gameState", "int",0],
        }],
        42: ["hostName", "string",server.host]
        }]
    }
                    Rec[Rec.length-1][0]=[{0:nj},300]
                    console.log("Recording Has Started")
                    server.rec=true
                }
                break;
        }
 
    },
    hanleclient(j){
    server.client.name = j[18][2]
    server.client.pid = j[8][2]
    server.client.team = j[40][2]
    server.client.goals = j[24][2]
    server.client.assits = j[32][2]
    },
    handleplayers(j){
        let json = {}
    json.name=j[18][2]
    json.skin=j[48][2]
    json.team=j[40][2]
    json.id=j[8][2]
    json.bot=j[56][2]
    json.exp=j[64][2]
        server.playerdetails[json.id] = json
    },
    handleentites(j){
        let eid = j[8][2]
        let d = j[18][2]
        server.entities[eid]={}
        server.entities[eid].eid=eid
        server.entities[eid].x=d[10][2][13][2]
        server.entities[eid].z=d[10][2][21][2]
        server.entities[eid].et=d[16][2]
        server.entities[eid].pid=d[24][2]
        server.entities[eid].rot=d[37][2]
        server.entities[eid].fx=d[42][2][13][2]
        server.entities[eid].fz=d[42][2][21][2]
        if(server.playerdetails[d[24][2]]){
        server.playerdetails[d[24][2]].eid = eid}
    },
    getp(){
        let arr = []
        server.playerdetails.forEach((i)=>{
            let nj={
            8: ["id", "int",i.id],
            18: ["name", "string",i.name],
            56: ["bot", "bool",i.bot],
            24: ["goals", "uint",0],
            32: ["assits", "uint",0],
            40: ["team", "uint",i.team],
            48: ["skinId", "uint",i.skin],
            64: ["experience", "uint",i.exp],
            }
        })
        return arr
    },
    gete(){
        let arr = []
        server.players.forEach((i)=>{
            let nj={
                8: ["id", "int",i.eid],
                18: ["entity", "dict", {
                    10: ["position", "dict", {
                        13: ["x", "float",i.x],
                        21: ["z", "float",i.z],
                    }],
                    16: ["entityType", "uint",i.et],
                    24: ["playerId", "uint",i.pid],
                    37: ["rotation", "float",i.rot],
                    42: ["forces", "dict", {
                        13: ["x", "float",i.fx],
                        21: ["z", "float",i.fz],
                    }],
                }]}
        })
        return arr
    },
}
WebSocket.prototype.s = WebSocket.prototype.send;
WebSocket.prototype.send = function (data) {
   if (!this.om){
       let q=this.url.split(":")
       server.port = q[q.length-1].split("/")[0]
       server.rec=true
       counter = setInterval(()=>{
           if(server.state==3){
               server.time-=1
           }
       },999)
       Rec[Rec.length]={}
       console.log("Recording Has Started")
       server.ws = this;
       this.om = this.onmessage;
       this.onmessage = async (e) => {
           server.t = e.type
           server.p = e.ports
           server.o = e.origin
           server.l = e.lastEventId
           server.s = e.source
           const arrayBuffer = await e.data.arrayBuffer();
           let uint8Array = new Uint8Array(arrayBuffer);
           let json = new BR().Mdecoder(uint8Array)
           ServerPacketHandler.PacketSplitter(json)
           if(server.rec==true){
           Rec[Rec.length-1][server.count]= [json,server.time]
           server.count+=1
       }
           let arr = new BR([]).Mencoder(json)
           uint8Array = new Uint8Array(arr)
           const m = new Blob([uint8Array], { type: "" });
           const msg = new MessageEvent(e.type, {
                   data: m,
                   ports: e.ports,
                   origin: e.origin,
                   lastEventId: e.lastEventId,
                   source: e.source,
            })
           this.om(msg);
           return
           }
   }
    data= new Uint8Array(data)
    let json = new BR().Sdecoder(data)
    let arr= new BR([]).Sencoder(json)
    data = new Uint8Array(arr)
    this.s(data);
    if (!this._closeBound) {
           this._closeBound = true;
           this.addEventListener('close', () => {
               let dat = Rec[Rec.length-1];
               if (server.rec && Object.keys(dat).length) {
                   save(dat);
                   clearInterval(counter);
                   counter = null;
                   server.players=[]
                   server.playerdetails=[]
                   server.entities=[]
               }
               server.count = 0;
           });
       }
}
