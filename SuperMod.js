//window.open("https://raw.githubusercontent.com/3lectr0Ninja/Bumpyball-io-Mods/refs/heads/main/Skin%20Unlocker%20Instructions.txt")
const originalFetch = window.fetch;
window.fetch = async function (...args) {
    const response = await originalFetch.apply(this, args);
    if(response.url.includes("/GetPlayerRecord")){
        const clone = await response.clone()
        const data = await response.clone().json();
        if(!data.Uid){return fetch("https://nifty-condition-169823.appspot.com/GetPlayerRecord?Game=BumpyBall&Uid=AU3s1oxeVqOPJt8Wrh4hEf4yf892")}
        else{if(data.Uid!=="AU3s1oxeVqOPJt8Wrh4hEf4yf892"){return fetch("https://nifty-condition-169823.appspot.com/GetPlayerRecord?Game=BumpyBall&Uid=AU3s1oxeVqOPJt8Wrh4hEf4yf892")}
            data.Experience=22081850;
            data.skin_id = Math.floor(Math.random() * 15);
            data.last_name = "Casual 131"
            }
        return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
    });
    }
    return response;
};
const server = window.server={
    cars:[
        [1, "Standard", 0],
        [1, "Cruiser", 1],
        [2, "Tricked Out", 2],
        [3, "Bugged Out", 3],
        [4, "Taxi Cab", 4],
        [5, "Hot Rod", 5],
        [7, "Drag Racer", 6],
        [10, "Classic", 7],
        [12, "Soccer Van", 8],
        [15, "Cement Mixer", 9],
        [20, "Apocalypse", 10],
        [25, "Dump Truck", 11],
        [30, "Steam Roller", 12],
        [35, "Box Car", 14],
        [50, "Pusher", 13]
    ],
    ot:{},
    pt:{},
    ci:null,
    cop:false,
    joinskin:null,
    oplayers:{},
    players:{},
    entities:{},
    pause:false,
    client: {},
    rj:false,
    rejoin() {
    this.rejoinUrl = this.ws.url
    this.ws.close()
    setTimeout(() => {
        this.rj = true
        gameInstance.SendMessage('MainMenu', 'OnConnectPressed')
    }, 2000)
},
    getclient(json){
        for(let b in json){
            this.client[json[b][0]]=json[b][2]
            if(json[b][0]=="id"){this.client.pid=json[b][2]}
            if(json[b][0]=="skinId"&&this.joinskin==null){this.joinskin=this.client.skinId}
        }
    },
    getplayers(json){
        let id = json[8][2]
        let skin = null
        for(let b in json){
            if(!this.oplayers[id]){this.oplayers[id]={}}
            this.oplayers[id][json[b][0]]=json[b][2]
            if(this.players[id]){
                switch(json[b][0]){
                    case "assits":
                    case "goals":{}
                }
            }
        }
        if(!this.players[id]){this.players[id]=structuredClone(this.oplayers[id]);}
    },
    showids(){
        let mess = "Choose Player:- \n"
        for(let b in this.oplayers){
            mess+=this.oplayers[b].name +" : " + String(b) + "\n"
        }
        return mess + "all"
    },
    handlesend(data){
        let j = data
        let packetid = j[8][2]
        let packetdata = j[18][2]
        switch(packetid){
            case 1 :{
                this.getclient(packetdata)
                packetdata[10][2] = "[99]3lectr0N!nj@"
                break;
            }
            case 5:{
                let m = packetdata[18][2]
                if (m.startsWith("/car")){
                    let id = Math.floor(Number(prompt(this.showids())))||"all"
                    if((!(id in this.players)) && (id!=="all")){window.alert("Invalid Player Id");}
                    let carsmenu = server.cars.map(([lvl, name, id]) => `[${id}] ${name} (Lv.${lvl})`).join("\n");
                    let c = Math.floor(Number(prompt(carsmenu)))
                    if(c>=0&&c<=14&&id!=="all"){this.players[id].skinId = Math.floor(c)
                    server.changecar(id)}
                    if(id=="all"){
                        for (let eid in this.entities){
                        if(c>=0&&c<=14){
                            let pid = this.entities[eid].playerId;
                            console.log("pid",pid);
                            this.players[pid].skinId = Math.floor(c);
                            server.changecar(pid)
                        }
                    }
                }
                    j[8][2]=1
                }
                if (m.startsWith("/color ")){
                    let id = Number(m.split(" ")[1])||"all"
                    if((!(id in this.players)) && (id!=="all")){window.alert("Invalid Player Id");}
                    let c = Number(m.split(" ")[2])
                    if(c!==2&&c>=0&&c<=3&&id!=="all"){}
                }
                console.log(m)
                if(m=="/rejoin"){server.rejoin()}
                break;
            }
            case 7:{
                this.client.eid = packetdata[24][2]
                break;
            }
        }
        data = j
        return data
    },
    split(compdata){
        for(let b in compdata){
            compdata[b]=this.handlerec(compdata[b])
        }
        return compdata
    },
    handlerec(data){
        let j = data
        let packetid = j[8][2]
        let packetdata = j[18][2]
        if(packetid!==6)console.log(packetid)
        switch(packetid){
            case 2:{
                this.client.pid = packetdata[24][2]
                packetdata[18][2][10][2].forEach((val)=>{
                    this.getplayers(val)
                    if(val[8][2]==this.client.pid){this.getclient(val);val[48][2]=this.players[this.client.pid].skinId=this.joinskin;}
                })
                packetdata[10][2][10][2].forEach((val)=>{
                    if(val[18][2][24][2] in this.oplayers){this.oplayers[val[18][2][24][2]].eid=this.players[val[18][2][24][2]].eid=val[8][2];this.entities[val[8][2]]={x:val[18][2][10][2][13][2],z:val[18][2][10][2][21][2],r:val[18][2][24][2]}}
                    if(val[18][2][24][2]==this.client.pid){this.client.eid=val[8][2]}
                })
                let port = ":"+(server.ws.url.split(":")[2].split("/")[0])
                setTimeout(()=>{gameInstance.SendMessage('GameCanvas', 'SetServerName',packetdata[42][2]+port)},1000)
                break;
            }
            case 3:{
                packetdata[10][2].forEach((val)=>{
                    this.getplayers(val)
                    if(val[8][2]==this.client.pid){this.getclient(val);val[48][2]=this.players[this.client.pid].skinId=this.joinskin;}
                })
                break;
            }
            case 4:{
                let id = packetdata[8][2]
                    delete this.oplayers[id]
                    delete this.players[id]
                break;
            }
            case 6:{
                if(packetdata[8][2] in this.entities){
                this.entities[packetdata[8][2]].x=packetdata[18][2][13][2]
                this.entities[packetdata[8][2]].z=packetdata[18][2][21][2]
                this.entities[packetdata[8][2]].r=packetdata[29][2]
                }
                 if(packetdata[8][2]==this.client.eid){
                     this.client.x = packetdata[18][2][13][2]
                     this.client.z = packetdata[18][2][21][2]
                     this.client.r = packetdata[29][2]
                    }
                break;
            }
            case 8:{
                if(packetdata[26][2][24][2]in this.oplayers){this.oplayers[packetdata[26][2][24][2]].eid=this.players[packetdata[26][2][24][2]].eid=packetdata[16][2]}
                this.entities[packetdata[16][2]]={}
                this.entities[packetdata[16][2]].x=packetdata[26][2][10][2][13][2]
                this.entities[packetdata[16][2]].z=packetdata[26][2][10][2][21][2]
                this.entities[packetdata[16][2]].r=packetdata[26][2][37][2]
                    if(packetdata[26][2][24][2]==this.client.pid){
                        this.client.eid=packetdata[16][2]
                        this.client.x = packetdata[26][2][10][2][13][2]
                        this.client.z = packetdata[26][2][10][2][21][2]
                        this.client.r = packetdata[26][2][37][2]
                    }
                break;
            }
            case 9:{
                
                break;
            }
            case 14:{
                if(packetdata[10][2].length){
                    packetdata[10][2].forEach((val)=>{
                        let pid = val[8][2]
                        this.getplayers(val)
                        if(pid==this.client.pid){this.getclient(val)}
                        val[48][2] = this.players[pid].skinId
                })
                }
                break;
            }
        }
        data = j
        return data
    },
    changecar(pid){
        this.om(this.Destroy(pid,this.players[pid].eid,0))
        this.om(this.Update(pid))
        this.om(this.Modify(pid,this.players[pid].eid,0))
    },
    om(json){
        let arr = new BR([]).Mencoder({0:json})
        let uint8Array = new Uint8Array(arr)
           const m = new Blob([uint8Array], { type: "" });
           const msg = new MessageEvent(server.t, {
                   data: m,
                   ports: server.p,
                   origin: server.o,
                   lastEventId: server.l,
                   source: server.s,
            })
           this.ws.om(msg);
    },
    Modify(pid,eid,et){
        let j = structuredClone(Packet[8])
        j[18][2][26][2][10][2][13][2]=this.entities[eid].x
        j[18][2][26][2][10][2][21][2]=this.entities[eid].z
        j[18][2][26][2][42][2][13][2]=0
        j[18][2][26][2][42][2][21][2]=0
        j[18][2][26][2][37][2]=this.entities[eid].r
        j[8][2] = 8
        j[18][2][16][2] = eid
        j[18][2][26][2][24][2] = pid
        j[18][2][26][2][16][2] = et
        return j
    },
    Destroy(pid,eid,et){
        let j = structuredClone(Packet[9])
        j[18][2][18][2][10][2][13][2]=0
        j[18][2][18][2][10][2][21][2]=0
        j[18][2][18][2][42][2][13][2]=0
        j[18][2][18][2][42][2][21][2]=0
        j[18][2][18][2][37][2]=0
        j[8][2] = 9
        j[18][2][8][2] = eid
        j[18][2][18][2][24][2] = pid
        j[18][2][18][2][16][2] = et
        j[18][2][24][2] = 0
        return j
    },
    Update(pid){
        let j = structuredClone(Packet[14])
        j[8][2] = 14
        j[18][2][10][1] = "dict"
        for(let b in j[18][2][10][2]){
            if(j[18][2][10][2][b][0]=="bot"){this.players[pid]["bot"]=0}
            j[18][2][10][2][b][2]=this.players[pid][j[18][2][10][2][b][0]]
        }
        return j
    },
}
const OWS = window.WebSocket
window.WebSocket = function(url, protocols) {
    if(server.rejoinUrl&&server.rj)url = server.rejoinUrl
    const ws = new OWS(url, protocols)
    server.ws = ws
    return ws
}
let WS = OWS.prototype
WS._send = WS.send
WS.send = function(data){
    server.ws=this
    if (!this.om){
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
           json = server.split(json)
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
                      if(!server.pause){this.om(msg);}
           return
           }
       this.oc = this.onclose;
       this.onclose=async(e)=>{
        server.joinskin=null
        server.oplayers={}
        server.players={}
        server.entities={}
        this.oc(e)
       }
   }
    data = new Uint8Array(data)
    let j = new BR().Sdecoder(data)
    j = server.handlesend(j)
    data = new Uint8Array(new BR().Sencoder(j))
    if (!server.rj&&data[1]==1) {
    this.join_arr = data
    server.join_arr = this.join_arr
    console.log("[REJOIN] Captured join packet")
}
    if(server.rj&&data[1]==1){
        data=server.join_arr
        server.rj=false
    }
    return this._send(data)
}
