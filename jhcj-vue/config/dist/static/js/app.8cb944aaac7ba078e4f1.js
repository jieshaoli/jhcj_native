webpackJsonp([1],{"1DHN":function(e,t){},"5OHe":function(e,t){},"7Nr7":function(e,t){},MaWP:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"liveIntro",props:{liveIntroUrl:{type:String,required:!0}},mounted:function(){console.log("liveIntroUrl: ",this.liveIntroUrl)}},o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"live-intro"}},[t("iframe",{attrs:{id:"live-intro-content",src:this.liveIntroUrl,frameborder:"0"}})])},staticRenderFns:[]};var i=n("C7Lr")(s,o,!1,function(e){n("mBmv")},"data-v-48fed6bd",null);t.default=i.exports},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("3cXf"),o=n.n(s),i=n("aA9S"),a=n.n(i),r=n("+RKF"),c=new r.default,l=n("4YfN"),u=n.n(l),d={name:"inputGroup",props:{type:{type:String,default:"text"},placeholder:String,value:String,name:String,disabled:Boolean,btnTitle:String,error:String}},f={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text_group"},[n("div",{staticClass:"input_group",class:{"is-invalid":e.error}},[n("input",{staticClass:"input_lab",attrs:{type:e.type,placeholder:e.placeholder,name:e.name},domProps:{value:e.value},on:{input:function(t){return e.$emit("input",t.target.value)}}}),e._v(" "),e.btnTitle?n("button",{staticClass:"input_btn",attrs:{disabled:e.disabled},on:{click:function(t){return t.stopPropagation(),e.$emit("btn-click")}}},[e._v(e._s(e.btnTitle))]):e._e()]),e._v(" "),e.error?n("div",{staticClass:"invalid-feedback"},[e._v(e._s(e.error))]):e._e()])},staticRenderFns:[]};var v=n("C7Lr")(d,f,!1,function(e){n("1DHN")},"data-v-396644de",null).exports,h=n("wSez"),g=n.n(h),m=n("rVsN"),_=n.n(m),p=n("I29D"),C={API_PATH:"http://pp.1yuaninfo.com",RongYunAppKey:"8luwapkv8b0wl"},b="",A=n.n(p).a.create({baseURL:C.API_PATH,timeout:5e3});A.interceptors.request.use(function(e){return e.needToken?(""===b&&(b=localStorage.getItem("access_token")),""!==b&&(e.headers={"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",Authorizations:"Bearerapp "+b})):e.headers={"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},e},function(e){return _.a.reject(e)}),A.interceptors.response.use(function(e){console.log(e.request.responseURL);var t=e.status,n=e.data.code;return 200!==t&&201!==t||0!==n?(console.log("else:",e),1e4!==n&&10001!==n&&10004!==n&&10005!==n&&10006!==n||(localStorage.removeItem("access_token"),b=""),_.a.reject(e)):(e.request.responseURL.indexOf("/app/v1/login/userLoginCode")>-1&&(localStorage.setItem("access_token",e.data.result.access_token),localStorage.setItem("refresh_token",e.data.result.refresh_token),b=e.data.result.access_token),console.log("success:",e),e.data)},function(e){return console.log("error:",e),_.a.reject(e)});var I=A,w=n("CtzY"),k=n.n(w);function E(e){return I({url:"/app/v2/course/room/message",method:"post",data:k.a.stringify(e),needToken:!1})}function R(e){return I({url:"/app/v1/login/userLoginCode",method:"post",data:k.a.stringify(e),needToken:!1})}var y=n("fUgm"),T={name:"loginPage",components:{inputGroup:v},data:function(){return{phone:"",verifyCode:"",btnTitle:"获取验证码",disabled:!1,errors:{},todo:""}},created:function(){var e=this;c.$on("login",function(t){console.log(t,"loginPage.vue"),"success-todo"==t&&e.networkForSaveUser()})},computed:u()({isClick:function(){return!this.phone||!this.verifyCode}},Object(y.c)({ttest:"test"})),mounted:function(){console.log(this.userInfo)},methods:{hide_view:function(){c.$emit("login","hide-view")},getVerifyCode:function(e){var t;this.validatePhone()&&(this.validateBtn(),(t={mobile_tel:this.phone},I({url:"/app/v1/login/code",method:"post",data:k.a.stringify(t),needToken:!1})).then(function(e){Object(h.Toast)({message:"验证码发送成功",position:"bottom",duration:2e3})}).catch(function(e){console.log(e)}))},validatePhone:function(){return this.phone?/^1[345678]\d{9}$/.test(this.phone)?(this.errors={},!0):(this.errors={phone:"请输入正确是手机号"},!1):(this.errors={phone:"手机号码不能为空"},!1)},validateBtn:function(){var e=this,t=60,n=setInterval(function(){0==t?(clearInterval(n),e.disabled=!1,e.btnTitle="获取验证码"):(e.btnTitle=t+"秒后重试",e.disabled=!0,t--)},1e3)},networkForLogin:function(){this.$store.dispatch("Login",{userName:this.phone,code:this.verifyCode}).then(function(e){Object(h.Toast)({message:"登录成功",position:"center",duration:2e3}),c.$emit("login","success-todo")}).catch(function(e){})},networkForSaveUser:function(){this.$store.dispatch("AddUser").then(function(e){console.log("SET_USER",e)}).catch(function(e){})}}},S={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"login-view"},on:{click:e.hide_view}},[n("div",{staticClass:"form-view",on:{click:function(e){e.stopPropagation()}}},[n("h1",[e._v("请先登录，再使用该功能")]),e._v(" "),n("input-group",{staticClass:"input-label",attrs:{type:"number",placeholder:"手机号",btnTitle:e.btnTitle,disabled:e.disabled,error:e.errors.phone},on:{"btn-click":e.getVerifyCode},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),e._v(" "),n("input-group",{staticClass:"input-label",attrs:{type:"number",placeholder:"验证码",error:e.errors.code},model:{value:e.verifyCode,callback:function(t){e.verifyCode=t},expression:"verifyCode"}}),e._v(" "),n("div",{staticClass:"login-bg"},[n("button",{staticClass:"login-btn",attrs:{disabled:e.isClick},on:{click:e.networkForLogin}},[e._v("登录")])])],1)])},staticRenderFns:[]};var x={name:"App",data:function(){return{show_login:!1}},components:{loginPage:n("C7Lr")(T,S,!1,function(e){n("gjAN")},"data-v-7685c3d2",null).exports},methods:{hide_view:function(){this.show_login=flase;document.getElementById("hide_view")}},created:function(){var e=this;c.$on("login",function(t){console.log(t,"show-login"),"show-view"==t?e.show_login=!0:"hide-view"!=t&&"success-todo"!=t||(e.show_login=!1)})}},L={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("div",{attrs:{id:"main-page"}},[t("keep-alive",[t("router-view")],1)],1),this._v(" "),t("login-page",{directives:[{name:"show",rawName:"v-show",value:this.show_login,expression:"show_login"}]})],1)},staticRenderFns:[]};var M=n("C7Lr")(x,L,!1,function(e){n("fYXN")},"data-v-172f4b30",null).exports,N=n("Fa/W"),U=n("jupl"),O={name:"liveChat",props:{course_info:{type:Object}},data:function(){return{input_placeholder:"输入内容...",chat_data:[],chat_token:"",chat_id:"",if_more_x:!0}},mounted:function(){var e=window.innerHeight/window.innerWidth;this.if_more_x=e>1.8},updated:function(){this.updateScroll()},computed:u()({},Object(y.b)({userInfo:"user"})),created:function(){var e=this,t=localStorage.getItem("access_token");t&&void 0!=t.length&&null!=t&&this.networkForChatInfo(),c.$on("login",function(t){"success-todo"==t&&e.networkForChatInfo()}),this.initChatRoomSDK()},methods:{checkUserInfo:function(){if(console.log("checkUserInfo"),""==this.userInfo.user_id||void 0==this.userInfo.user_id){localStorage.getItem("access_token");if(this.haveLogin()){var e=JSON.parse(localStorage.getItem("user"));e&&(this.userInfo.user_id=e.id,this.userInfo.user_name=e.user_nickname,this.userInfo.user_photo=e.user_picture,this.userInfo.user_role=2)}else c.$emit("login","show-view")}},haveLogin:function(){var e=localStorage.getItem("access_token");return null!=e&&void 0!=e&&e.length>1},sendMsg:function(){var e=document.getElementById("editor"),t=(new Date).getTime(),n=e.value,s={};n.length>0&&(s={content:n});var i={info_type:1,info:s,info_time:t+"",user:this.userInfo};this.chat_data.push(i);var a=o()(i),r=U.Base64.encode(a),c=new RongIMLib.TextMessage({content:r}),l=RongIMLib.ConversationType.CHATROOM,u=this.chat_id;RongIMClient.getInstance().sendMessage(l,u,c,{onSuccess:function(e){console.log("发送文本消息成功",e)},onError:function(e){console.log("发送文本消息失败",e)}}),e.blur(),e.value=""},updateScroll:function(){var e=void 0;(e=this.if_more_x?document.getElementById("lite-chat-box2"):document.getElementById("lite-chat-box1")).scrollTop=e.scrollHeight},networkForChatInfo:function(){var e,t=this;(e=this.course_info,I({url:"/app/v2/course/chat/message",method:"post",data:k.a.stringify(e),needToken:!0})).then(function(e){t.chat_token=e.result.data.token,t.chat_id=e.result.data.sdk_id,t.rongYunConnect()}).catch(function(e){})},initChatRoomSDK:function(){RongIMLib.RongIMClient.init(C.RongYunAppKey),RongIMClient.setConnectionStatusListener({onChanged:function(e){switch(e){case RongIMLib.ConnectionStatus.CONNECTED:console.log("链接成功");break;case RongIMLib.ConnectionStatus.CONNECTING:console.log("正在链接");break;case RongIMLib.ConnectionStatus.DISCONNECTED:console.log("断开连接");break;case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:console.log("其他设备登录, 本端被踢");break;case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:console.log("域名不正确, 请至开发者后台查看安全域名配置");break;case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:console.log("网络不可用, 此时可调用 reconnect 进行重连");break;default:console.log("链接状态为",e)}}});var e=this;RongIMClient.setOnReceiveMessageListener({onReceived:function(t){var n=t.content;switch(t.messageType){case RongIMClient.MessageType.TextMessage:console.log("文字内容",U.Base64.decode(n.content));var s=U.Base64.decode(n.content),o=JSON.parse(s);9!=o.info_type&&11!=o.info_type&&e.chat_data.push(o);break;case RongIMClient.MessageType.ImageMessage:console.log("图片缩略图 base64",n.content),console.log("原图 url",n.imageUri);break;case RongIMClient.MessageType.HQVoiceMessage:console.log("音频 type ",n.type),console.log("音频 url",n.remoteUrl),console.log("音频 时长",n.duration);break;case RongIMClient.MessageType.RichContentMessage:console.log("文本内容",n.content),console.log("图片 base64",n.imageUri),console.log("原图 url",n.url);break;case RongIMClient.MessageType.UnknownMessage:console.log("未知消息, 请检查消息自定义格式是否正确",t);break;default:console.log("收到消息",t)}}})},rongYunConnect:function(){var e=this;RongIMClient.connect(this.chat_token,{onSuccess:function(t){console.log("连接成功, 用户 id 为",t),e.joinChatRoom()},onTokenIncorrect:function(){console.log("连接失败, 失败原因: token 无效")},onError:function(e){var t="";switch(e){case RongIMLib.ErrorCode.TIMEOUT:t="链接超时";break;case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:t="不可接受的协议版本";break;case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:t="appkey 不正确";break;case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:t="服务器不可用";break;default:t=e}console.log("连接失败, 失败原因: ",t)}})},joinChatRoom:function(){RongIMClient.getInstance().joinChatRoom(this.chat_id,0,{onSuccess:function(){console.log("加入聊天室成功")},onError:function(e){console.log("加入聊天室失败",e)}})}},beforeDestroy:function(){RongIMClient.getInstance().quitChatRoom(this.chat_id,{onSuccess:function(){console.log("退出聊天室成功"),RongIMClient.getInstance().disconnect()},onError:function(e){console.log("退出聊天室失败")}})}},D={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"live-chat"}},[n("div",{staticClass:"lite-chatbox",attrs:{id:e.if_more_x?"lite-chat-box2":"lite-chat-box1"}},[n("ul",e._l(e.chat_data,function(t,s){return n("li",{key:s},[t.user.user_id==e.userInfo.user_id?n("div",{staticClass:"cright cmsg"},[n("img",{staticClass:"headIcon radius",attrs:{ondragstart:"return false;",oncontextmenu:"return false;",src:t.user.user_photo}}),e._v(" "),n("span",{staticClass:"time"},[e._v(e._s(e._f("showTime")(t.info_time)))]),e._v(" "),n("span",{staticClass:"name"},[e._v(e._s(t.user.user_name))]),n("br"),e._v(" "),n("span",{staticClass:"content"},[e._v(e._s(t.info.content))])]):t.user.user_id!=e.userInfo.user_id&&1==t.info_type?n("div",{staticClass:"cleft cmsg"},[n("img",{staticClass:"headIcon radius",attrs:{ondragstart:"return false;",oncontextmenu:"return false;",src:t.user.user_photo}}),e._v(" "),n("span",{staticClass:"name"},[e._v(e._s(t.user.user_name))]),e._v(" "),n("span",{staticClass:"time"},[e._v(e._s(e._f("showTime")(t.info_time)))]),n("br"),e._v(" "),n("span",{staticClass:"content"},[e._v(e._s(t.info.content))])]):t.user.user_id==e.teacher_id&&2==t.info_type?n("div",{staticClass:"cleft cmsg"},[n("img",{staticClass:"headIcon radius",attrs:{ondragstart:"return false;",oncontextmenu:"return false;",src:t.user.user_photo}}),e._v(" "),n("span",{staticClass:"name"},[e._v(e._s(t.user.user_name))]),e._v(" "),n("span",{staticClass:"time"},[e._v(e._s(e._f("showTime")(t.info_time)))]),n("br"),e._v(" "),n("span",{staticClass:"content"},[n("img",{attrs:{src:t.info.image_url}})])]):t.user.user_id==e.teacher_id&&3==t.info_type?n("div",{staticClass:"cleft cmsg"},[n("img",{staticClass:"headIcon radius",attrs:{ondragstart:"return false;",oncontextmenu:"return false;",src:t.user.user_photo}}),e._v(" "),n("span",{staticClass:"name"},[e._v(e._s(t.user.user_name))]),e._v(" "),n("span",{staticClass:"time"},[e._v(e._s(e._f("showTime")(t.info_time)))]),n("br"),e._v(" "),n("span",{staticClass:"content"},[e._v("这是播放音频的")])]):t.user.user_id==e.teacher_id&&4==t.info_type?n("div",{staticClass:"cleft cmsg"},[n("img",{staticClass:"headIcon radius",attrs:{ondragstart:"return false;",oncontextmenu:"return false;",src:t.user.user_photo}}),e._v(" "),n("span",{staticClass:"name"},[e._v(e._s(t.user.user_name))]),e._v(" "),n("span",{staticClass:"time"},[e._v(e._s(e._f("showTime")(t.info_time)))]),n("br"),e._v(" "),n("span",{staticClass:"content"},[e._v(e._s(t.info.content)),n("br"),n("img",{attrs:{src:t.info.image_url}})])]):t.user.user_id==e.teacher_id&&5==t.info_type?n("div",{staticClass:"cleft cmsg"},[n("img",{staticClass:"headIcon radius",attrs:{ondragstart:"return false;",oncontextmenu:"return false;",src:t.user.user_photo}}),e._v(" "),n("span",{staticClass:"name"},[e._v(e._s(t.user.user_name))]),e._v(" "),n("span",{staticClass:"time"},[e._v(e._s(e._f("showTime")(t.info_time)))]),n("br"),e._v(" "),n("span",{staticClass:"content"},[n("div",{staticClass:"questionDiv"},[n("span",{staticClass:"questionName"},[e._v("【问】"+e._s(t.info.qa_name))]),e._v(" "),n("span",{staticClass:"questionTime"},[e._v(e._s(e._f("showTime")(t.info.qa_time)))]),n("br"),e._v(" "),n("span",{staticClass:"questionContent"},[e._v(e._s(t.info.qa_content))])]),e._v("\n            【答】"+e._s(t.info.content)+"\n          ")])]):t.user.user_id==e.teacher_id&&6==t.info_type?n("div",{staticClass:"cleft cmsg"},[n("img",{staticClass:"headIcon radius",attrs:{ondragstart:"return false;",oncontextmenu:"return false;",src:t.user.user_photo}}),e._v(" "),n("span",{staticClass:"name"},[e._v(e._s(t.user.user_name))]),e._v(" "),n("span",{staticClass:"time"},[e._v(e._s(e._f("showTime")(t.info_time)))]),n("br"),e._v(" "),n("span",{staticClass:"content"},[n("div",{staticClass:"questionDiv"},[n("span",{staticClass:"questionName"},[e._v("【问】"+e._s(t.info.qa_name))]),e._v(" "),n("span",{staticClass:"questionTime"},[e._v(e._s(e._f("showTime")(t.info.qa_time)))]),n("br"),e._v(" "),n("span",{staticClass:"questionContent"},[e._v(e._s(t.info.qa_content))])]),e._v("\n            【答】"),n("img",{attrs:{src:t.info.image_url}})])]):t.user.user_id==e.teacher_id&&7==t.info_type?n("div",{staticClass:"cleft cmsg"},[n("img",{staticClass:"headIcon radius",attrs:{ondragstart:"return false;",oncontextmenu:"return false;",src:t.user.user_photo}}),e._v(" "),n("span",{staticClass:"name"},[e._v(e._s(t.user.user_name))]),e._v(" "),n("span",{staticClass:"time"},[e._v(e._s(e._f("showTime")(t.info_time)))]),n("br"),e._v(" "),n("span",{staticClass:"content"},[n("div",{staticClass:"questionDiv"},[n("span",{staticClass:"questionName"},[e._v("【问】"+e._s(t.info.qa_name))]),e._v(" "),n("span",{staticClass:"questionTime"},[e._v(e._s(e._f("showTime")(t.info.qa_time)))]),n("br"),e._v(" "),n("span",{staticClass:"questionContent"},[e._v(e._s(t.info.qa_content))])]),e._v("\n            【答】"+e._s(t.info.content)),n("br"),n("img",{attrs:{src:t.info.image_url}})])]):e._e()])}),0)]),e._v(" "),n("div",{class:e.if_more_x?"input-box2":"input-box1"},[n("input",{attrs:{id:"editor",type:"text",placeholder:e.input_placeholder},on:{focus:e.checkUserInfo}}),e._v(" "),n("mt-button",{staticClass:"send-btn",attrs:{type:"primary"},nativeOn:{click:function(t){return e.sendMsg(t)}}},[e._v("发送")])],1)])},staticRenderFns:[]};var Y=n("C7Lr")(O,D,!1,function(e){n("fEXO")},"data-v-ea376eac",null).exports,P={name:"chatRoom",data:function(){return{title:"文字直播课",course_info:{}}},components:{liveChat:Y},created:function(){if(window.location.href.indexOf("id")>-1){var e=window.location.href.split("id=")[1].split("&")[0];this.course_info={type:1,uid:e},console.log("chatRoom id = ",e),this.networkForCourseInfo()}},methods:{networkForCourseInfo:function(){var e=this;E(this.course_info).then(function(t){var n=t.result.course;n&&(e.title=n.course_head)}).catch(function(e){})},collect:function(){if(this.haveLogin()){var e=localStorage.getItem("access_token");console.log(e,"有token")}else c.$emit("login","show-view")},haveLogin:function(){var e=localStorage.getItem("access_token");return null!=e&&void 0!=e&&e.length>1},backPage:function(){console.log("aaaaa")}}},K={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"chat-room"}},[t("div",{staticClass:"fixed-div"},[t("mt-header",{staticClass:"header",attrs:{title:this.title}},[t("router-link",{attrs:{slot:"left",to:"/"},slot:"left"},[t("mt-button",{attrs:{icon:"back"},on:{click:this.backPage}})],1),this._v(" "),t("mt-button",{staticClass:"nav-right-btn",attrs:{slot:"right"},on:{click:this.collect},slot:"right"},[t("img",{staticStyle:{width:"20px",height:"20px"},attrs:{src:n("qnEy"),alt:""}})])],1)],1),this._v(" "),t("div",{staticClass:"content"},[t("live-chat",{attrs:{course_info:this.course_info}})],1)])},staticRenderFns:[]};var V=n("C7Lr")(P,K,!1,function(e){n("cntt")},"data-v-61fbd6f0",null).exports,F=n("knuO"),B=n("MaWP"),H=(n("+s/H"),n("yxk2")),j=n.n(H),q=n("D1Uu"),W=n.n(q),z=void 0,Z={name:"liveRoom",data:function(){return{course_info:{},title:"直播课",selected:"简介",hlsUrl:"",flvUrl:"",liveDefaultImg:"",courseIntroUrl:""}},components:{liveIntro:B.default,liveKeys:F.default,liveChat:Y},methods:{initLivePlayer:function(){var e=document.getElementById("mse");"apple"==this.ifAppleBrowser()?(console.log("hls player"),z=new j.a({id:"mse",url:this.hlsUrl,isLive:!0,preloadTime:30,minCachedTime:5,cors:!0,closeVideoClick:!0,playsinline:!0,width:e.width,height:e.height,"x5-video-player-type":"h5",poster:this.liveDefaultImg})):(console.log("flv player"),z=new W.a({id:"mse",url:this.flvUrl,isLive:!0,preloadTime:30,minCachedTime:5,cors:!0,closeVideoClick:!0,playsinline:!0,width:e.width,height:e.height,"x5-video-player-type":"h5",poster:this.liveDefaultImg})),z.once("ready",function(){console.log("ready")}),z.once("complete",function(){console.log("complete")}),z.once("destroy",function(){console.log("destroy")})},ifAppleBrowser:function(){var e=navigator.userAgent.toLocaleLowerCase();return console.log(e),(e.indexOf("iphone os")>-1||e.indexOf("mac os")>-1)&&e.indexOf("mobile")>-1?"apple":"else"},initRongYun:function(){},backPage:function(){console.log("aaaaa")},collect:function(){if(this.haveLogin()){var e=localStorage.getItem("access_token");console.log(e,"有token")}else c.$emit("login","show-view")},haveLogin:function(){var e=localStorage.getItem("access_token");return null!=e&&void 0!=e&&e.length>1},networkForLiveInfo:function(){var e=this;E(this.course_info).then(function(t){var n=t.result.course;n&&(e.title=n.course_head,e.hlsUrl=n.hls_pull_url,e.flvUrl=n.http_pull_url,e.liveDefaultImg=n.course_picture,e.courseIntroUrl=n.synopsis_url,e.hlsUrl.length>1&&e.flvUrl.length)}).catch(function(e){})}},created:function(){if(window.location.href.indexOf("id")>-1){var e=window.location.href.split("id=")[1].split("&")[0];this.course_info={type:2,uid:e},console.log("liveRoom id = ",e),this.networkForLiveInfo()}},mounted:function(){},destroyed:function(){z.destroy(!0)}},Q={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"live-room"}},[s("div",{staticClass:"fixed-div"},[s("mt-header",{staticClass:"header",attrs:{title:e.title}},[s("router-link",{attrs:{slot:"left",to:"/"},slot:"left"},[s("mt-button",{attrs:{icon:"back"},on:{click:e.backPage}})],1),e._v(" "),s("mt-button",{staticClass:"nav-right-btn",attrs:{slot:"right"},on:{click:e.collect},slot:"right"},[s("img",{staticStyle:{width:"20px",height:"20px"},attrs:{src:n("qnEy"),alt:""}})])],1),e._v(" "),e._m(0),e._v(" "),s("div",{staticClass:"live-choose"},[s("mt-navbar",{staticClass:"navbar",model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[s("mt-tab-item",{attrs:{id:"简介"}},[e._v("\n          简介\n        ")]),e._v(" "),s("mt-tab-item",{attrs:{id:"要点"}},[e._v("\n          要点\n        ")]),e._v(" "),s("mt-tab-item",{attrs:{id:"交流"}},[e._v("\n          交流\n        ")])],1)],1)],1),e._v(" "),s("div",{staticClass:"content"},[s("mt-tab-container",{attrs:{swipeable:!0},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}},[s("mt-tab-container-item",{attrs:{id:"简介"}},[s("div",{staticClass:"content-box"},[s("live-intro",{attrs:{liveIntroUrl:e.courseIntroUrl}})],1)]),e._v(" "),s("mt-tab-container-item",{attrs:{id:"要点"}},[s("div",{staticClass:"content-box"},[s("live-keys")],1)]),e._v(" "),s("mt-tab-container-item",{attrs:{id:"交流"}},[s("div",{staticClass:"content-box"},[s("live-chat",{attrs:{course_info:e.course_info}})],1)])],1)],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"live-div"}},[t("div",{staticClass:"swipe"}),this._v(" "),t("div",{attrs:{id:"mse"}})])}]};var G=n("C7Lr")(Z,Q,!1,function(e){n("taaG")},"data-v-8f9066ee",null).exports;r.default.use(N.a);var J=new N.a({routes:[{path:"/",name:"liveRoom",component:G,children:[{path:"/liveIntro",component:function(){return new Promise(function(e){e()}).then(n.bind(null,"MaWP"))}},{path:"/liveKeys",component:function(){return new Promise(function(e){e()}).then(n.bind(null,"knuO"))}},{path:"liveChat",component:function(){return new Promise(function(e){e()}).then(n.bind(null,"knuO"))}}]},{path:"/chatRoom",name:"chatRoom",component:V}],mode:"history"}),X={user:{user_id:"",user_name:"",user_photo:"",user_role:2},access_token:"",refresh_token:"",test:{}},$={SET_ACCESS_TOKEN:function(e,t){e.access_token=t},SET_REFRESH_TOKEN:function(e,t){e.refresh_token=t},SET_USER:function(e,t){e.user.user_id=t.id,e.user.user_name=t.user_nickname,e.user.user_photo=t.user_picture,e.user.user_role=2},SET_TEST:function(e,t){e.test=t}},ee={user:function(e){return e.user},access_token:function(e){return e.access_token},refresh_token:function(e){return e.refresh_token}},te={addTest:function(e,t){(0,e.commit)("SET_TEST",t)},Login:function(e,t){var n=e.commit;return new _.a(function(e,s){R(t).then(function(t){var s=t.result.access_token,o=t.result.refresh_token;n("SET_ACCESS_TOKEN",s),n("SET_REFRESH_TOKEN",o),e(t)}).catch(function(e){s(e)})})},AddUser:function(e){var t=e.commit;return new _.a(function(e,n){I({url:"/app/v1/user/center/base",method:"get",needToken:!0}).then(function(n){t("SET_USER",n.result.info),e(n)}).catch(function(e){n(e)})})}};r.default.use(y.a);var ne=new y.a.Store({state:X,actions:te,mutations:$,getters:ee}),se=n("9VR0"),oe=n.n(se);n("5OHe"),n("7Nr7"),new oe.a;r.default.use(g.a),r.default.config.productionTip=!1,r.default.filter("showTime",function(e){var t=Number(e);if(void 0==t||""==t||null==t)return"wrong time";var n=new Date(t),s=(n.getFullYear(),n.getMonth()+1>=10?n.getMonth():n.getMonth(),n.getDate()>=10?n.getDate():n.getDate(),n.getHours()>=10?n.getHours():"0"+n.getHours()),o=n.getMinutes()>=10?n.getMinutes():"0"+n.getMinutes();n.getSeconds(),n.getSeconds();return s+":"+o}),new r.default({el:"#app",router:J,store:ne,components:{App:M},template:"<App/>",mounted:function(){sessionStorage.getItem("state")&&this.$store.replaceState(a()({},this.$store.state,JSON.parse(sessionStorage.getItem("state")))),window.addEventListener("beforeunload",this.saveState)},methods:{saveState:function(){sessionStorage.setItem("state",o()(this.$store.state))}}})},cntt:function(e,t){},fEXO:function(e,t){},fYXN:function(e,t){},gY1u:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB3UlEQVRIS7VWMW8TMRT+3rNzUTOkASTUJOQq0KkLEisLKhszvwN17cjEyIr4HcxsoC6sjBAJcQkXCQm1ZEiVO/sZuVWq485BFGGP9vP3vff587MJW4YDaJplSVKWvU5V9YV3usqajg+3Slcs5+uq01mWSbLKptOSABeCotBkMRr1jFIDa21fW74A3TaMkkoptdTWno2KYtWM+43AZ52n6UAbc1ssJ38Cbq6xktJo/T3N87N6NVcEHvzbeHzTWrXHTvg64JtYIZaBlkV/Pj/dkFwRfE3TGygx+lfwOgkSFPt5furnLgi85g6YXFeWbVV6uQiY+TMhL81sMhlS6W6FNjDzrmP3EGKfCvDAxzDwEazekNAHEfkZ2ucS+jGZzRb0Ocu6erW6G3KLYhxYuCOCe+wTqQN5jR3onQK9soJPTRLvLtPrfSGvPa/lTssVzLsC+wJwh5dJB4cA9J6hnocqkS7PqRgO962ofsu/mp5A7Mtm5gGfO7A6dsa9ba4ptkuaj+8dOFN2WxtZXjvg0d/YlYATJ/ysnWSypsVeet8EfO9YTghoVRY8UGBJwq1kNLFEJfAXL75E0Q85uk2jX7TorSJ6s9v4Omq79iTRH5wNSbQns94Coj36dZL/9W35BeJoaV639WKXAAAAAElFTkSuQmCC"},gjAN:function(e,t){},gmXd:function(e,t){},knuO:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"liveKeys",data:function(){return{keysInfo:[]}},created:function(){for(var e in[1,2,3,4,5,6]){var t={ctime:(new Date).getTime()+"",contentStr:"龙头股通常在大盘下跌末期端，市场恐慌时，逆市涨停，提前见底，或者先于大盘启动，并且经受大盘一轮下跌考验。再如12月2日出现的新龙头太原刚玉，它符合刚讲的龙头战法。"};this.keysInfo.push(t)}}},o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"live-keys"}},[n("ul",e._l(e.keysInfo,function(t,s){return n("li",{key:s},[n("div",{staticClass:"cell-bg"},[n("span",{staticClass:"time"},[e._v(e._s(e._f("showTime")(t.ctime)))]),e._v(" "),e._m(0,!0),e._v(" "),n("div",{staticClass:"content-bg"},[n("p",[e._v(e._s(t.contentStr))])])])])}),0)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"point-line"},[t("img",{staticClass:"red-points",attrs:{src:n("gY1u"),alt:""}}),this._v(" "),t("div",{staticClass:"verticle-line"})])}]};var i=n("C7Lr")(s,o,!1,function(e){n("gmXd")},"data-v-779953f5",null);t.default=i.exports},mBmv:function(e,t){},qnEy:function(e,t){e.exports="data:image/png;base64,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"},taaG:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.8cb944aaac7ba078e4f1.js.map