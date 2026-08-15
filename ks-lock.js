window.KS={iter:150000,
b64d:function(s){var b=atob(s),a=new Uint8Array(b.length);for(var i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return a;},
_key:function(pw,salt){return crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']).then(function(base){return crypto.subtle.deriveKey({name:'PBKDF2',salt:salt,iterations:window.KS.iter,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['decrypt']);});},
decrypt:function(o,pw){var self=this;return this._key(pw,self.b64d(o.salt)).then(function(key){return crypto.subtle.decrypt({name:'AES-GCM',iv:self.b64d(o.iv)},key,self.b64d(o.ct));}).then(function(pt){return new TextDecoder().decode(pt);});},
validate:function(pw){return this.decrypt(this.token,pw).then(function(v){return v==='ok';}).catch(function(){return false;});}};
window.KS.token={"salt":"OnlvdT5IHm4KPlqadBl5GQ==","iv":"P91EaQFCkBbNaB0W","ct":"t/siOwvoxHeglLBO8PN2Z28e"};
