const hi = () => {
  var now = new Date();
  var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  console.log('Hello', time);
};
setInterval(() => {
  hi();
}, 5000);
