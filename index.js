const vm = require('vm');
const crypto = require('crypto');
const fs = require('fs');


const secretKey = crypto.createHash('sha256').update("your_secret_key").digest();
const encryptedCode = "你的代码已被加密";


function decrypt(code) {
  let decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, Buffer.alloc(16, 0));
  let decrypted = decipher.update(code, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


(function() {
  function detectDevTools() {
    const start = performance.now();
    debugger;
    const end = performance.now();
    if (end - start > 100) {
      console.warn("DevTools detected!");
      while (true) {} 
    }
    requestAnimationFrame(detectDevTools);
  }
  detectDevTools();
})();


(function() {
  const scriptHash = "abcdef1234567890";
  function checkIntegrity() {
    const newHash = crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex');
    if (newHash !== scriptHash) {
      console.error("Code tampering detected!");
      process.exit(1);
    }
  }
  setInterval(checkIntegrity, 5000);
})();


const script = new vm.Script(decrypt(encryptedCode));
script.runInThisContext();
