window.open("https://raw.githubusercontent.com/3lectr0Ninja/Bumpyball-io-Mods/refs/heads/main/Skin%20Unlocker%20Instructions.txt")
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
    pause:false,
    modcar:null,
    client: {},
    getclient(json){
        for(let b in json){
            this.client[json[b][0]]=json[b][2]
            if(json[b][0]=="id"){this.client.pid=json[b][2]}
        }
        this.client.skinId = this.modcar
    },
    handlesend(data){
        let j = data
        let packetid = j[8][2]
        let packetdata = j[18][2]
        switch(packetid){
            case 1 :{
                this.getclient(packetdata)
                this.modcar=packetdata[32][2]
                console.log("skinId:",packetdata[32][2])
                break;
            }
            case 5:{
                let m = packetdata[18][2]
                if (m.startsWith("/car ")){
                    try{
                    let c = Number(m.split(" ")[1])
                    if(c>=0&&c<=14){server.modcar = this.client.skinId = Math.floor(c);server.changecar();j[8][2]=1}
                    }catch(err){window.alert("Invalid Car Id")}
                }
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
        switch(packetid){
            case 2:{
                this.client.pid = packetdata[24][2]
                packetdata[18][2][10][2].forEach((val)=>{
                    if(val[8][2]==this.client.pid){this.getclient(val);val[48][2]=this.client.skinId}
                })
                packetdata[10][2][10][2].forEach((val)=>{
                    if(val[18][2][24][2]==this.client.pid){this.client.eid=val[8][2]}
                })
                break;
            }
            case 3:{
                packetdata[10][2].forEach((val)=>{
                    if(val[8][2]==this.client.pid){this.getclient(val);val[48][2]=this.client.skinId}
                })
                break;
            }
            case 6:{
                 if(packetdata[8][2]==this.client.eid){
                     this.client.x = packetdata[18][2][13][2]
                     this.client.z = packetdata[18][2][21][2]
                     this.client.r = packetdata[29][2]
                    }
                break;
            }
            case 8:{
                    if(packetdata[26][2][24][2]==this.client.pid){
                        this.client.eid=packetdata[16][2]
                        this.client.x = packetdata[26][2][10][2][13][2]
                        this.client.z = packetdata[26][2][10][2][21][2]
                        this.client.r = packetdata[26][2][37][2]
                    }
                break;
            }
            case 14:{
                console.log(packetdata)
                if(packetdata[10][2].length){
                    packetdata[10][2].forEach((val)=>{
                        console.log(val)
                    if(val[8][2]==this.client.pid){this.getclient(val);val[48][2]=this.client.skinId}
                })
                }
                break;
            }
            case 17:{
                this.getclient(packetdata[10][2][10][2])
                if(packetdata[10][2][10][2]==this.client.uid){packetdata[10][2][96][2]=this.client.skinId}
                break;
            }
        }
        data = j
        return data
    },
    changecar(){
        this.Destroy(this.client.pid,this.client.eid,0)
        this.Update(this.client.pid)
        this.Modify(this.client.pid,this.client.eid,0)
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
        j[18][2][26][2][10][2][13][2]=this.client.x
        j[18][2][26][2][10][2][21][2]=this.client.z
        j[18][2][26][2][42][2][13][2]=0
        j[18][2][26][2][42][2][21][2]=0
        j[18][2][26][2][37][2]=this.client.r
        j[8][2] = 8
        j[18][2][16][2] = eid
        j[18][2][26][2][24][2] = pid
        j[18][2][26][2][16][2] = et
        this.om(j)
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
        this.om(j)
    },
    Update(pid){
        let j = structuredClone(Packet[14])
        j[8][2] = 14
        j[18][2][10][1] = "dict"
        for(let b in j[18][2][10][2]){
            j[18][2][10][2][b][2]=this.client[j[18][2][10][2][b][0]]
        }
        this.om(j)
    },
}
WebSocket.prototype._send=WebSocket.prototype.send
WebSocket.prototype.send = function(data){
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
   }
    data = new Uint8Array(data)
    let j = new BR().Sdecoder(data)
    j = server.handlesend(j)
    data = new Uint8Array(new BR().Sencoder(j))
    return this._send(data)
}
