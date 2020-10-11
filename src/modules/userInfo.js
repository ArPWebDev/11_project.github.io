export default class UserInfo {
    constructor(className, classJob, classAvatar, inputName, inputJob) {
        this.name = className;
        this.job = classJob;
        this.avatar = classAvatar;
        this.inputName = inputName;
        this.inputJob = inputJob;
    }

    setUserInfo(initialName, initialJob, initialAvatar){
        this.name.textContent = initialName;
        this.job.textContent = initialJob;
        this.avatar.style.backgroundImage = `url(${initialAvatar})`;
    } 

    updateUserInfo(){
        this.name.textContent = this.inputName.value;
        this.job.textContent = this.inputJob.value;
    }

    actualInputInfo() {
        this.inputName.value = this.name.textContent;
        this.inputJob.value = this.job.textContent;
      }
    
    
}