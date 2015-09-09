var g$url = {
    param:{},
    getParam:function(){
        this.param = {};
        var str = '';
        var args = location.search.split("&");

        for (var i = 0; i < args.length; i++) {
            str = args[i];
            var arg = str.split("=");
            if (arg.length <= 0) continue;
            if (arg.length == 1) this.param[arg[0]] = true;
            else this.param[arg[0]] = arg[1];
        }

        if(location.hash)this.param.hash = location.hash.substr(1);
        return this.param;
    },
    getWxAuth:function(){
        alert("getWxAuth");
        var REURI = encodeURIComponent(location.origin + location.pathname),
            STATE = this.param.hash||"false";
        return location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf72ed77c92113ec4&redirect_uri="+REURI+"&response_type=code&scope=snsapi_userinfo&state="+STATE+"#wechat_redirect"
    },
    checkUrl:function(){
        var state = this.param.state;
        alert("checkUrl-state:" + state);
        if(state!="true"){
            alert("checkCode:"+this.param.code);
            document.cookie = "code="+ (this.param.code||null) +"&";
            alert("cookie:"+document.cookie);
            if(state=="false"){
                alert("state==false");
                location.href = location.origin + location.pathname + '?state=true#list'
            }else{
                alert("state:"+state);
                location.href = location.origin + location.pathname + '?state=true#' + state;
            }
        }else{
            var code = document.cookie.match(/code=([^\b&]*)/);
            alert("checkUrl-cookieGet-code:" + code);
            if(code){
                code = code[1];
                ROLE.code=code;
                ROLE.isAuth=true;
                document.cookie = "code=&";
                alert(ROLE.code);
            }else{
                this.getWxAuth();
            }
        }
    }
};

var ROLE = {
    isAuth:false,
    code:'',
    openId:'',
    subscribe:0
};

alert(location.href);
if(!g$url.getParam().state){
    g$url.getWxAuth();
}else{
    g$url.checkUrl();
}