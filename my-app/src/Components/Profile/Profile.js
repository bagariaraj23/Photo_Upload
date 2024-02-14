import React from "react";
import basestyle from "../Base.module.css";
import profileStyle from "./Profile.module.css";
import ImageUploading from "react-images-uploading";

const Profile = ({ setUserState, username }) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className={profileStyle.profile}>
      <div className="profile">
        <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
        <button
          className={basestyle.button_common}
          onClick={() => setUserState({})}
        >
          Logout
        </button>
      </div>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className={profileStyle.upload__image_wrapper}>
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>Remove all images</button>
              {imageList.map((image, index) => (
                <div key={index} className={profileStyle.image_item}>
                  <img src={image.data_url} alt="" width="100" />
                  <div className={profileStyle.image_item_btn_wrapper}>
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      {/* </div> */}
    </div>
  );
};
export default Profile;
