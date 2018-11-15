<!--  个人页面 -->
<template>
	<div class="mine_mm">
	<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">个人信息</h3>
	</header>
	<main class="mine_layout">
	    <section class="my_order_box my_b_info">
	        <div class="order_top_box"  style= 'height: 80px;'>
	        	<div style='padding-top:20px;float:left;max-width:100px'>
	        		<img src="../assets/images/baitiao2.png" alt="" style='width:15px; height:18px'>
	        	头像 :
	        	</div>
	        	<div class="order_left" style = 'float: left;'>
		             <span> 
		             	<div class="user_icon">
			<img :src=uInfs.face_Path style='width:65px; height:65px' @click.stop="uploadHeadImg" id = 'displayAcv' alt="">
		            </div>
		            <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
		            <input type="text" value='' id='fileName' class="hiddenInput" />
		        	</span>
		        </div>
	        </div>

	        <div class="order_top_box">
	            <div class="order_left">
	            	<img src="../assets/images/baitiao2.png" alt="">
	                <span>
	                <div style='font-size: 18px;width:400px'>
					商城昵称: {{uInfs.nick_Name}}
					<!-- <input type="text" name="nick_Name" disabled id='nick_Name' class="user_input" 
					style ='font-size: 18px; padding-left:20px'
		            	:value="uInfs.nick_Name"/> -->
		        	</div>
	                </span>
	            </div>
	        </div>
			<div class="order_top_box">
            <div class="order_left">
	            	<img src="../assets/images/baitiao2.png" alt="">
	                <span>
	                <div style='font-size: 18px;width:400px'>
					出生日期:{{uInfs.birth_Date}}
					<!--  <input type="date" name="true_Name" disabled id='true_Name' class="user_input" 
					style ='font-size: 18px; padding-left:20px'
		            	:value="uInfs.birth_Date"/> -->
		        	</div>
	                </span>
	            </div>
	        </div>
	        <div class="order_top_box">
	            <div class="order_left">
	                <img src="../assets/images/baitiao2.png" alt="">
	                <span>
	                <div style='font-size: 18px;width:200px'>
			性别:  男<input  type="radio" name="sex" disabled
			style='-webkit-appearance: checkbox;width:20%;height: 30px;' id='man' :checked='uInfs.isMan'>
			女<input  type="radio" name="sex" disabled :checked='uInfs.isWomen' style='-webkit-appearance: checkbox;width:20%;height: 30px;' id='woman' >
		        	</div>
	                </span>
	            </div>
	        </div>	        
	        <div class="order_top_box">
	            <div class="order_left">
	                <img src="../assets/images/baitiao2.png" alt="">
	                <span>
	                <div style='font-size: 18px;width:400px'>
					昵称:{{uInfs.nick_Name}}
				<!-- 	<input type="text" name="true_Name" disabled id='true_Name' class="user_input" 
					style ='font-size: 18px; padding-left:20px'
		            	:value="uInfs.nick_Name"/> -->
		        	</div>
	                </span>
	            </div>
	        </div>
	    </section>
	</main>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				uInfs:{},
				imgs: [],
				imgData: {  
            		accept: 'image/gif, image/jpeg, image/png, image/jpg',  
        		}
			}
		},
		mounted(){
			this.getUDatas();
			this.uploadHeadImg();
		},
		methods:{
			getUDatas(){
				let _this = this;
				let useId = window.sessionStorage.user_id;
				// _this.uInfs = {
				// 	balance: 50,
				// 	user_name: window.sessionStorage.user_Name,
				// 	isDean: parseInt(window.sessionStorage.user_Type)
				// };
				_this.$http.get('/user/member/userinfo').then((res)=>{
					_this.uInfs = res.data.resultData;
					_this.uInfs.face_Path = res.config.baseURL.substr(0, 29) + _this.uInfs.face_Path;
					if (_this.uInfs.sex === 0) {
						_this.uInfs.isMan = true;
					} else {
						_this.uInfs.isWomen = true;
					}
 				},(err)=>{
					console.log('用户数据' + err);
				})
			},

			// 打开图片上传
			uploadHeadImg () {
				this.$el.querySelector('.hiddenInput').click()
			},
			handleFile (e) {

		      let $target = e.target || e.srcElement
		      let file = $target.files[0]
			  let type=file.type;//文件的类型，判断是否是图片  
              let size=file.size;//文件的大小，判断图片的大小  
           	  if(this.imgData.accept.indexOf(type) == -1){  
                alert('请选择我们支持的图片格式！');  
                return false;  
              }
             var srcs = this.getObjectURL(file);//获取路径
             document.getElementById('displayAcv').src = srcs; //生成预览图片
             document.getElementById('fileName').value = file.name; //存放图片

			// if(size>3145728){  
   //              alert('请选择3M以内的图片！');  
   //              return false;  
   //          }

   			  var url = '' 
		      var reader = new FileReader()
		      reader.onload = (file, name) => {
		        let res = file.target || file.srcElement
		        let img = new Image()
			    this.$http.post('/user/member/ChangeAvatar',{
			    	data:[{
			    		'filename': document.getElementById('fileName').value,
			    		'img': res.result
			    	}]},{  
			    	 headers: {
	            				'Content-Type': 'application/json;charset=UTF-8'
	        			}
	            }).then(response => {	 
	            }).catch(error => {  
	                alert('上传图片出错！');  
	            })  
		        // img.src = res.result //base64
		      }
				reader.readAsDataURL(file)
		    },

		    getObjectURL (file) {
			    var url = null;
		        if (window.createObjectURL != undefined) {
		            url = window.createObjectURL(file)
		        } else if (window.URL != undefined) {
		            url = window.URL.createObjectURL(file)
		        } else if (window.webkitURL != undefined) {
		            url = window.webkitURL.createObjectURL(file)
		        }
		        return url
			}
		}
	}
</script>

<style rel="stylesheet/scss">
    /* 隐藏的输入框 */
    .hiddenInput {
      opacity: 0;
      position: absolute;
    }
</style>



