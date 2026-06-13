// ==UserScript==
// @name         Bumpyball.io/Pucks.io Decoder
// @namespace    https://github.com/3lectr0Ninja
// @version      1
// @description  To understand data of messages you send
// @author       3lectr0N!nj@
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pucks.io
// @grant        none
// ==/UserScript==
let Packet ={
0:{},
1:{
        8:  ["PacketId","int"],
        18: ["Data","dict",{
        10: ["name", "string"],
        18: ["uid", "string"],
        24: ["version", "uint"],
        32: ["skinId", "uint"],
        42: ["password", "string"],
        50: ["idToken","string"],
        56: ["authenticationMethod", "uint"],
        }]
    },
2:{
        8:  ["PacketId","int"],
        18: ["Data","dict",{
        10: ["entities", "dict", {
            10: ["list", "arr", {
                8: ["id", "int"],
                18: ["entity", "dict", {
                    10: ["position", "dict", {
                        13: ["x", "float"],
                        21: ["y", "float"],
                    }],
                    16: ["entityType", "uint"],
                    24: ["playerId", "uint"],
                    37: ["rotation", "float"],
                    42: ["forces", "dict", {
                        13: ["x", "float"],
                        21: ["y", "float"],
                    }],
                }],
            }],
        }],
        18: ["players", "dict", {
            10: ["list", "arr", {
            8: ["id", "int"],
            18: ["name", "string"],
            56: ["bot", "bool"],
            24: ["goals", "uint"],
            32: ["assits", "uint"],
            40: ["team", "uint"],
            48: ["skinId", "uint"],
            64: ["experience", "uint"],
            }]
        }],
        24: ["playerId", "uint"],
        34: ["gameState", "dict", {
            13: ["timeRemaining", "float"],
            18: ["teams", "arr", {
                8: ["teamId", "int"],
                16: ["score", "int"],
            }],
            24: ["gameState", "int"],
        }],
        42: ["hostName", "string"]
        }]
    },
3:{
        8:  ["PacketId","int"],
        18: ["Data","dict",{
        10: ["list", "dict", {
            8: ["id", "int"],
            18: ["name", "string"],
            56: ["bot", "int"],
            24: ["goals", "uint"],
            32: ["assits", "uint"],
            40: ["team", "uint"],
            48: ["skinId", "uint"],
            64: ["experience", "uint"],
        }]
        }]
    },
4:{
        8: ["PacketId", "uint"],
        18: ["Data", "dict",{
        8: ["playerId", "uint"],
        }]
    },
5:{
        8: ["PacketId","int"],
        18: ["Data","dict",{
        8: ["playerId", "uint"],
        18: ["message", "string"]
        }]
    },
6:{
        8:  ["PacketId","int"],
        18: ["Data","dict",{
        8: ["id", "uint"],
        18: ["position", "dict", {
            13: ["x", "float"],
            21: ["y", "float"]
        }],
        29: ["rotation", "float"],
        34: ["velocity", "dict", {
            13: ["x", "float"],
            21: ["z", "float"],
                    }],
        45: ["angularvelocity","float"]
        }]
},
7:{
        8: ["PacketId", "int"],
        18: ["Data", "dict",{
        8: ["command", "int"],
        18: ["position", "dict", {
            13: ["x", "float"],
            21: ["y", "float"],
        }],
        24: ["EID", "uint"],
        32: ["idTarget","uint"]
        }]
},
8:{
        8: ["PacketId", "int"],
        18: ["Data", "dict",{
        16: ["id", "uint"],
        26: ["entity", "dict", {
            10: ["position", "dict", {
                13: ["x", "float"],
                21: ["y", "float"],
            }],
            16: ["entityType", "uint"],
            24: ["playerId", "uint"],
            37: ["rotation", "float"],
            42: ["forces", "dict", {
                13: ["x", "float"],
                21: ["y", "float"],
            }],
        }]
        }]
    },
9:{
        8: ["PacketId", "uint"],
        18: ["Data", "dict",{
        8: ["id", "uint"],
        18: ["entity", "dict", {
            10: ["position", "dict", {
                13: ["x", "float"],
                21: ["y", "float"],
            }],
            24: ["playerId", "uint"],
            16: ["entityType", "uint"],
            37: ["rotation", "float"],
            42: ["forces", "dict", {
                13: ["x", "float"],
                21: ["y", "float"],
            }],
        }],
        24: ["reason", "uint"],
        32: ["attackerpid","uint"]
        }]
    },
10:{},
11:{
        8:  ["PacketId","int"],
        18: ["Data","dict",{
        10: ["message", "string"],
        16: ["playerIdA", "uint"],
        24: ["playerIdB", "uint"],
        }]
    },
12:{
        8: ["PacketId", "int"],
        18: ["Data", "dict",{
        13: ["timeRemaining", "float"],
        18: ["teams", "arr", {
            8: ["teamId", "int"],
            16: ["score", "int"],
        }],
        24: ["gameState", "int"],
        }]
    },
13:{
        8: ["PacketId", "int"],
        18: ["Data", "dict",{
        8: ["team", "uint"],
        16: ["id", "uint"]
        }]
    },
14:{
            8:  ["PacketId","int"],
        18: ["Data","dict",{
            10: ["list", "arr", {
            8: ["id", "int"],
            18: ["name", "string"],
            56: ["bot", "bool"],
            24: ["goals", "uint"],
            32: ["assits", "uint"],
            40: ["team", "uint"],
            48: ["skinId", "uint"],
            64: ["experience", "uint"],
            }],
        }]
    },
15:{
        8:  ["PacketId","int"],
        18: ["Data","dict",{
        8: ["event", "uint"],
        16: ["playerId", "uint"],
        24: ["data", "uint"],
        }]
    },
16:{
        8:  ["PacketId","int"],
        18: ["Data","dict",{
        10: ["PlayerRecords","dict",{
            10: ["list", "arr", {
            8: ["id", "int"],
            18: ["name", "string"],
            56: ["bot", "bool"],
            24: ["goals", "uint"],
            32: ["assits", "uint"],
            40: ["team", "uint"],
            48: ["skinId", "uint"],
            64: ["experience", "uint"],
            }],
        }]
        }]
    },
17:{
         8:  ["PacketId","int"],
        18: ["Data","dict",{
        10: ["PlayerRecord","dict",{
          10: ["uid","string"],
          34: ["name","string"],
          40: ["goals","int"],
          48: ["assits","int"],
          56: ["wins","int"],
          64: ["draws","int"],
          72: ["lost","int"],
          80: ["spareExp","int"],
          88: ["exp","int"],
          96: ["skinId","int"]
        }],
        }]
    },
18:{
         8:  ["PacketId","int"],
        18: ["Data","dict",{
        10: ["challenges","arr",{
          8: ["id","uint"],
          16: ["challengetype","uint"],
          40: ["challengeGoal","int"],
          48: ["challengeProgress","int"],
        }],
        }]
    },
19:{
         8:  ["PacketId","int"],
        18: ["Data","dict",{
        10: ["challenges","dict",{
          8: ["id","uint"],
          16: ["challengetype","uint"],
          40: ["challengeGoal","int"],
          48: ["challengeProgress","int"],
        }],
        }]
    }
}
class BR {
arr=[];
i=0;
    constructor (a) {
a??=[];
this.arr = [...a];
}
    skip(){
    return (this.arr.length - this.i) ;
    }
    rbs (size){
    let r = this.arr.slice(this.i,this.i+size);
    this.i+=size;
    return r ;
    }
    rb (){
    return this.rbs(1)[0]
    }
    int7(){
    let r = 0;
    let b = 0;

    while (b !== 35) {
        let c = this.rb();
        r |= (c & 127) << b;

        if ((c & 128) === 0) {
            return [r, (b / 7) + 1];
        }

        b += 7;}
    }
    str(){
    let l = this.int7()[0]
    let s = new TextDecoder().decode(new Uint8Array(this.rbs(l)))
    return s
    }
    f32(){
    let l = new Uint8Array(this.rbs(4))
    let f = new Float32Array(l.buffer)[0]
    return f
    }
    dec(json){
        let l
        let s
        let arrs=[]
        let v
        let obj ={};
        for (let byte in json) {
  let [keyName, valueType] = json[byte];

  if (["int", "bool", "uint","float"].includes(valueType)) {
    obj[byte] = [keyName,valueType,0];
  }
}
        for (let byte in json) {
            byte = Number(byte)
  let [keyName, valueType] = json[byte];
}
        while(this.skip()>0){
            let byte = this.rb()
        let [keyName,valueType] = json[byte]
        let value
        switch(valueType){
            case "int":
            case "uint":
            case "bool":
                value = this.int7()[0];
                break;
            case "string":
                value =this.str();
                break;
            case "float":
                value =this.f32();
                break;
            case "dict":
                l = this.int7()[0]
                s = new BR(new Uint8Array(this.rbs(l)))
                value = s.dec(json[byte][2])
                break;
                case "arr":
                 l = this.int7()[0]
                s = new BR(new Uint8Array(this.rbs(l)))
                v = s.dec(json[byte][2])
                arrs.push(v)
                value = arrs
        }
            obj[byte] = [keyName,valueType,value];
        }
        return obj
    }
    bit7(num){
           for(;num>=128;num>>=7)this.arr.push((128|num)%256);return this.arr.push(num%256)
             }
    ft32(num){
    let f = new Float32Array([num])
    let b = new Uint8Array(f.buffer)
    this.arr.push(...b)
    }
    istr(value){
    let s = new TextEncoder().encode(value)
    this.arr.push(s.length,...s)
    }
    ab(value){
    this.arr.push(value)
    }
    enc(json){
        for (let byte in json) {
  let [keyName,valueType,value] = json[byte]
  let da
  let a
  switch(value){
      case 0:
          valueType = ""
  }
  switch(valueType){
            case "int":
            case "uint":
            case "bool":
                this.ab(Number(byte))
                this.bit7(value)
                break;
            case "string":
                this.ab(Number(byte))
                this.istr(value);
                break;
            case "float":
                this.ab(Number(byte))
                this.ft32(value);
                break;
            case "dict":
                da = new BR([]).enc(json[Number(byte)][2])
                this.ab(Number(byte))
                this.bit7(da.length)
                this.arr.push(...da)
                break;
                case "arr":
                value.forEach(index=>{
                    a = new BR([]).enc(index)
                    this.ab(Number(byte))
                    this.bit7(a.length)
                    this.arr.push(...a)
                })
        }
}
        return this.arr
    }
    Sdecoder(d){
    let json ={}
    let sd = new BR(d)
    json = sd.dec(Packet[d[1]])
            if(json[8][2]==1){
            json[18][2][18][2]="AU3s1oxeVqOPJt8Wrh4hEf4yf892"
            if(json[18][2][50]){delete json[18][2][50]}
    }
    return json
}
    Sencoder(j){
    let a =[]
    a = new BR([]).enc(j)
        return a
}
    Mdecoder(d){
        let j = {}
        let r=(-1)
        let s
        let wa = new BR(d)
        while(wa.skip()>0){
            wa.rb()
        let l = wa.int7()[0]
        let a = wa.rbs(l)
        let s = new BR().Sdecoder(a)
        j[r+=1] = s
        }
        return j
               }
    Mencoder(j){
        let a_
        let a =[]
        for (let b in j) {
        let _j = j[b]
        a_ = new BR([]).Sencoder(_j)
        let le = new BR([])
        le.bit7(a_.length)
        let l = le.arr
            a.push(10,...l,...a_)
        }
        return a
}
        }
