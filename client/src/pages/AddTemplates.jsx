import { useState } from "react";
import axios from "axios";

const AddTemplates = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));


    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://shriramcard.com/api/v1/template/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setImageUrl(response.data.data.image); // Update with Cloudinary URL
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upload Your Template
        </h2>

        <label className="w-full flex flex-col items-center px-4  py-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition">
          <span className="font-semibold">Choose File</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </label>

        {imageUrl && (
          <div className="mt-4">
            <p className="text-gray-600 text-sm">Image Preview:</p>
            <img
              src={imageUrl}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg shadow-md mx-auto mt-2"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          className="w-full mt-4 bg-green-500 text-white py-2  rounded-lg hover:bg-green-600 transition"
        >
          Upload
        </button>  
      </div>
    </div>
  );
};

export default AddTemplates;
