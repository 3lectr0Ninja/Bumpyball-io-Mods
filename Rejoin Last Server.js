let server = window.server = {
    rj:false,
    rejoin() {
    this.rejoinUrl = this.ws.url
    this.ws.close()
    setTimeout(() => {
        this.rj = true
        gameInstance.SendMessage('MainMenu', 'OnConnectPressed')
    }, 2000)
},
    split(compdata){
        for(let b in compdata){
            compdata[b]=this.handlerec(compdata[b])
        }
        return compdata
    },
    handlesend(j) {
        let PID = j[8][2]
        let PD = j[18][2]
        switch(PID){
            case 5:{
                let msg = PD[18][2]
                if(msg=="/rejoin"){server.rejoin()}
            }
        }
        j[8][2] = PID
        j[18][2] = PD
        return j
    },
    handlerec(j){
        let PID = j[8][2]
        let PD = j[18][2]
        switch(PID){
            case 2:{
                let port = ":"+(server.ws.url.split(":")[2].split("/")[0])
                setTimeout(()=>{gameInstance.SendMessage('GameCanvas', 'SetServerName',PD[42][2]+port)},500)
            }
        }
        j[8][2] = PID
        j[18][2] = PD
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

WS.send = function(data) {

    server.ws = this

    if (!this.om) {
        this.om = this.onmessage
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
           this.om(msg);
           return
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
