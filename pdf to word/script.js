// استماع للنقر على زر التحويل
document.getElementById("convertButton").addEventListener("click", function() {
    const fileType = document.getElementById("fileType").value;
    const files = document.getElementById("fileInput").files;

    if (files.length === 0) {
        alert("من فضلك اختر ملفًا!");
        return;
    }

    switch (fileType) {
        case 'pdf-to-word':
            convertPdfToWord(files[0]);
            break;
        case 'word-to-pdf':
            convertWordToPdf(files[0]);
            break;
        default:
            alert("نوع التحويل غير مدعوم!");
    }
});

// دالة لتحويل PDF إلى Word باستخدام CloudConvert API
function convertPdfToWord(file) {
    const apiKey = ''; // API Key الذي قدمته
    const formData = new FormData();
    formData.append('file', file);

    // إرسال طلب إلى CloudConvert API
    fetch('https://api.cloudconvert.com/v2/convert', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("حدث خطأ: " + data.error.message);
        } else {
            // تحميل الملف المحول (مثال: ملف Word)
            const downloadUrl = data.data.output.url;
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = downloadUrl;
            downloadLink.style.display = 'block';
        }
    })
    .catch(error => {
        console.error("حدث خطأ:", error);
        alert("حدث خطأ أثناء التحويل.");
    });
}

// دالة لتحويل Word إلى PDF باستخدام CloudConvert API
function convertWordToPdf(file) {
    const apiKey = ''; // API Key الذي قدمته
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://api.cloudconvert.com/v2/convert', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("حدث خطأ: " + data.error.message);
        } else {
            // تحميل الملف المحول (مثال: ملف PDF)
            const downloadUrl = data.data.output.url;
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = downloadUrl;
            downloadLink.style.display = 'block';
        }
    })
    .catch(error => {
        console.error("حدث خطأ:", error);
        alert("حدث خطأ أثناء التحويل.");
    });
}
