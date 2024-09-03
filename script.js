"use strict";

const selectionArea = document.querySelector("#select-area"),
    fileInput = document.querySelector(".file-input");

let preview = document.getElementById("file-preview");
let removeImage = document.getElementById("remove-img");

// Initially hide the remove button and the preview image
removeImage.style.display = "none";
preview.style.display = "none";

removeImage.addEventListener("click", () => {
    fileInput.value = null;
    preview.src = ""; // Clear the image preview
    preview.style.display = "none"; // Hide the preview image
    removeImage.style.display = "none"; // Hide the remove icon
    selectionArea.style.display = "flex"; // Show the selection area again
});

selectionArea.addEventListener("click", () => {
    fileInput.click(); // Trigger file input click when the selection area is clicked
});

fileInput.onchange = ({ target }) => {
    let file = target.files[0];
    if (file.type === "image/jpeg") { // Correct file type check
        let image_url = URL.createObjectURL(file);
        preview.src = image_url;
        selectionArea.style.display = "none"; // Hide the selection area
        removeImage.style.display = "block"; // Show the remove icon
        preview.style.display = "block"; // Show the preview image
    } else {
        alert("Please select a JPG file");
        fileInput.value = null;
    }
};

// Handle form submission and convert JPG to PNG
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    if (!fileInput.files.length) {
        alert("No file selected!");
        return;
    }

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    let img = new Image();
    img.src = preview.src;

    img.onload = () => {
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);

        // Convert the canvas content to a PNG data URL
        let pngUrl = canvas.toDataURL("image/png");

        // Create a download link for the converted PNG
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "converted-image.png";
        downloadLink.click();
    };
});
