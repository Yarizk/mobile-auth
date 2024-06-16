// make formdata and send it to the server
const formData = new FormData();
let data = {
    uri : "asd",
    filename : 'test.png',
    contentType : 'image/png'
}
formData.append('image', data);
console.log(formData);

// make a request to the server
let uri = "file:///data/user/0/host.exp.exponent/cache/cropped1814158652.jpg";

const axios = require('axios');

async function uploadAndGetImageUrl() {
    try {
      const localUri = 'file:///data/user/0/host.exp.exponent/cache/cropped1814158652.jpg';
      const response = await axios.get(localUri, { responseType: 'stream' });
      console.log(response.data);
    //   const response = await axios.get(localUri, { responseType: 'arraybuffer' });
      console.log(response.data);
      const imageData = response.data;
  
      // Upload the image data to the server
    //   const uploadResponse = await axios.post('/api/upload', imageData, {
    //     headers: {
    //       'Content-Type': 'application/octet-stream',
    //     },
    //   });
  
      // Get the web URL of the uploaded image from the server response
      const imageUrl = uploadResponse.data.url;
  
      // You can now fetch the image using the web URL
      const webResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const webImageData = webResponse.data;
  
      console.log(webImageData);
    } catch (error) {
      console.error(error);
    }
  }
  
  uploadAndGetImageUrl();


// async function sendData() {
//     fetch('http://localhost:3009/api/user/update/picture', {
//         method: 'POST',
//         headers: {
//             // 'Content-Type': 'multipart/form-data',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFhNWJkYzdlY2I1NDM4Njc0N2IyZCIsImZ1bGxOYW1lIjoiWWFhc2RzYXNkYWFzZGEiLCJpYXQiOjE3MTc2NzU0ODgsImV4cCI6MTcxNzc2MTg4OH0.0byLgG-TMoHUYWiwAr_1DM0cJG3XgaHwyXEc9TA5Qi0',
//         },
//         body: {uri: "file:///data/user/0/host.exp.exponent/cache/cropped1814158652.jpg"}
//     })
//         .catch(error => console.log(error));
// }

// sendData();