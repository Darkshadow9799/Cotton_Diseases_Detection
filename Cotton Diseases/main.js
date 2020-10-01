async function predict() {
    const model = await tf.loadLayersModel('tfjs_models/model.json');
    //model.summary();
    let image = $("#pred_img").get(0);
    let tensorImg = tf.browser.fromPixels(image,3)
                    .resizeNearestNeighbor([224,224])
                    .toFloat()
                    .expandDims()
                    .reverse(-1);

    let normalizationOffset = tf.scalar(127.5);
    var normalized = tensorImg.toFloat().sub(normalizationOffset).div(normalizationOffset);
    let prediction = await model.predict(normalized).data();
    for(let i=0;i<prediction.length;i++){
        prediction[i]=prediction[i].toFixed(2);
    }
    console.log(prediction.indexOf(Math.max(...prediction)));
    let preds=prediction.indexOf(Math.max(...prediction));   
    if(preds==0)
        preds="The leaf is diseased cotton leaf";
    else if(preds==1)
        preds="The leaf is diseased cotton plant";
    else if(preds==2)
        preds="The leaf is fresh cotton leaf"
    else
        preds="The leaf is fresh cotton plant"

    document.getElementById('result').innerHTML='Results: '+preds;
    console.log(prediction);
}


function changeImage(){
    document.getElementById('upload_image').style.visibility="hidden";
    document.getElementById('pred_img').style.visibility="visible";
    var imageDisplay=document.getElementById('pred_img');
    var selectImage=document.getElementById('select-img').files[0];
    imageDisplay.src=URL.createObjectURL(selectImage);
    predict();
}

/* 
if preds==0:
    preds="The leaf is diseased cotton leaf"
else if preds==1:
    preds="The leaf is diseased cotton plant"
else if preds==2:
    preds="The leaf is fresh cotton leaf"
else:
    preds="The leaf is fresh cotton plant"
*/
