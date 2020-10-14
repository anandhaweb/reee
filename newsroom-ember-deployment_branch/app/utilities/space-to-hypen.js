export default function spaceToHypen(str) {
    let hypenString = str && str.replace(/\s/g , "-");
    if(hypenString.length > 70) hypenString = hypenString.substring(0,70);
    return hypenString 
  }
  