const axios=require('axios')
export function preimg(that,list){
  console.log("路由跳转",list)
  that.$router.push({path:'/preview',query:{list:list}})
}
//下载图片地址和图片名
export function downloadIamge(imgsrc, name) {
  var newImgsrc = 'http://192.168.1.115:3000/imgs/preview?src=' + imgsrc;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', newImgsrc, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    // arraybuffer格式的数据
    var str=this.response;
    // 转为base64格式数据
    var n_s=transformArrayBufferToBase64(str)
    var a = document.createElement("a"); // 生成一个a元素
    var event = new MouseEvent("click"); // 创建一个单击事件
    a.download = name || "photo"; // 设置图片名称
    // 前面需要添加 'data:image/png;base64,'
    a.href = 'data:image/png;base64,'+n_s; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event); // 触发a的单击事件
  };
  xhr.send();
}

function transformArrayBufferToBase64 (buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    for (var len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
