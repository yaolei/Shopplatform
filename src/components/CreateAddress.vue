<template>
	<div class="my_l">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">{{this.titleName}}</h3>
		</header>
		<main class="user_login_box">
		<el-form ref="form" :model="form" label-width="100px" :rules="rules">
	    <section class="my_order_box" style='height: auto;'>
	    	<el-row :gutter="20">
	    		<el-col :span="7">
		  		  <el-form-item label="收货人:" prop="name">
					<el-input v-model="form.name" style='width: 180px; margin-top: 5px;'></el-input>
				  </el-form-item>
		  		</el-col>
			</el-row>
		</section>
		<section class="my_order_box" style='height: auto;'>
			<el-row :gutter="20">
				<el-col :span="6">
			  		  <el-form-item label="联系电话:" prop="name">
						<el-input v-model="form.tel" style='width: 180px; margin-top: 5px;'></el-input>
					  </el-form-item>
			  	</el-col>
			</el-row>
	    </section>
		<section class="my_order_box" style='height: auto;'>
			<el-row :gutter="20">
			  	<el-col :span="7">
			  		<div class="grid-content bg-purple topPdding" style='text-align: right;'>所在地区:</div>
			  	</el-col>
			</el-row>
			<el-row :gutter="20">
			  	<el-col :span="20" style='padding-left:50px;float:right'>
					<area-select type='text' :level='2' v-model="selected" :data="pcaa" 
					 v-if='this.isEdit == false'></area-select>
				</el-col>			  	
				<el-col :span="20" v-if='this.isEdit == true' style='padding-left:50px;float:right'>
					<area-select type='text' :level='2' v-model="selected" :data="pcaa" 
					:placeholders="placeholders"></area-select>
				</el-col>
			</el-row>
	    </section>
	    <section class="my_order_box" style='height: auto;'>
	    	<el-row :gutter="20">
				<el-col :span="8">
			  		  <el-form-item label="详细地址:" prop="name">
						<el-input v-model="form.address" style='width: 180px; margin-top: 5px;'></el-input>
					  </el-form-item>
			  	</el-col>			  	
			</el-row>
		</section>
	    <section class="my_order_box" style='height: auto;'>
			<el-row :gutter="20">
				<el-col :span="18">
				    <el-form-item label="设为默认地址" label-width='120px'>
			    		<el-checkbox-group v-model="form.checked">
			      			<el-checkbox v-model="form.checked" name="type"
			      			@change="checked=>clickCheckbox(checked)" :checked="form.checked"></el-checkbox>
			    		</el-checkbox-group>
			  </el-form-item>
			  	</el-col>			  	
			</el-row>
	    </section>
		<section class="my_order_box" style='height: 150px;'>
			<el-row :gutter="20">
				<el-col :span="24">
				  	<div class="grid-content bg-purple topPdding" style="text-align: center;">
				  		<el-button type="success" round @click="submit('form')">保存</el-button>
				  	</div>
				  </el-col>
			</el-row>
	    </section>
		</el-form>
		</main>
	</div>
</template>
<script>
import { pca, pcaa } from 'area-data';
	export default{
		data(){
			return{
				placeholders: ["2", "1", "3"],
				submitDatas:{},
				addressDatas:[],
				selected: [],
			    pca: pca,
			    isEdit:false,
			    pcaa: pcaa,
			    datas:{},
			    form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: '',
		          tel:'',
		          address:'',
		          checked:true,
		          addIds:0
		        },
		        rules: {
		          name: [
		            { required: true, message: '请输入收货人姓名', trigger: 'blur' },
		          ],
		          tel: [
		            { required: true, message: '请选择活动区域', trigger: 'change' }
		          ],
		          address: [
		            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
		          ],
		          date2: [
		            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
		          ],
		          type: [
		            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
		          ]
		        }
		    }
		},
		mounted(){
			this.getaddressDatas();
		},
		created () {
			this.setTitleName();
		},
		methods:{
			clickCheckbox(obj) {
			},
			setTitleName() {
				let _this = this;
				if (this.$route.params.id === 'isEdit') {
					_this.titleName = '修改地址';
					_this.isEdit = true;
					_this.placeholders[0] = this.$route.params.prname;
					_this.placeholders[1] = this.$route.params.cityname;
					_this.placeholders[2] = this.$route.params.disname;
				} else {
					_this.titleName = '收货地址';
					_this.isEdit = false;
				}
			},
			getaddressDatas() {
				let _this = this;
				if (this.$route.params.id === 'isEdit') {	
					let addConf = {
						"Id": parseInt(this.$route.params.obj),
					}		
					_this.$http.post('/Mall/Member/ShippingAddressDetail',
						JSON.stringify(addConf)
						,{
						headers: {'Content-Type': 'application/json;charset=UTF-8'}
		                }).then((res)=>{
		                	_this.form.name = res.data.resultData.user_Name;
		                	_this.form.addIds = res.data.resultData.id;
		                	_this.form.address = res.data.resultData.address;
		                	_this.form.tel = res.data.resultData.user_PhoneNum;
		                	_this.form.checked = res.data.resultData.isDefaultaddress;
		                	_this.datas[0][provIdData] = res.data.resultData.province;
		                	_this.datas[1][cityIdData] = res.data.resultData.city;
		                	_this.datas[2][disIdData] = res.data.resultData.district;
		                	var provIdData = res.data.resultData.province_Id;
		                	var cityIdData = res.data.resultData.city_Id;
		                	var disIdData = res.data.resultData.district_Id;
		                	_this.selected[0] = [];
		                	_this.selected[1] = [];
		                	_this.selected[2] = [];
		                	_this.selected[0][provIdData] = res.data.resultData.province;
		                	_this.selected[1][cityIdData] = res.data.resultData.city;
		                	_this.selected[2][disIdData] = res.data.resultData.district;

					},(err)=>{
						console.log('左侧数据' + err);
					})
				}
			},

			getJsonVal(ArrJson) {
				let resuArr = [];
				for (var k in ArrJson) {
					resuArr[0] = k;
					resuArr[1] = ArrJson[k];
				}
				return resuArr;
			},

			submit: function(formName) {
				let _this = this;
				if (this.$route.params.id === 'isEdit') {
					_this.submitDatas.id = this.addressDatas.id;
				} else {
					_this.submitDatas.id = '0';
				}
				let ids = 0;
		        this.$refs[formName].validate((valid) => {
		          if (valid) {

		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });

				let provinceId = this.getJsonVal(JSON.parse(JSON.stringify([...this.selected][0])));
				let cityId = this.getJsonVal(JSON.parse(JSON.stringify([...this.selected][1])));
				let distr = this.getJsonVal(JSON.parse(JSON.stringify([...this.selected][2])));
				let addressJsonData ={
					user_Name: _this.form.name,
					id: _this.form.addIds,
					user_PhoneNum: _this.form.tel,
					Province_Id:provinceId[0],
					City_Id:cityId[0],
					District_Id:distr[0],
					province: JSON.parse(JSON.stringify([...this.selected][0])),
					City: JSON.parse(JSON.stringify([...this.selected][1])),
					Tag: '',
					District: JSON.parse(JSON.stringify([...this.selected][2])),
					Address :_this.form.address,
					isDefaultaddress: this.form.checked
				};

                _this.$http.post('/Mall/Member/ShippingAddressSave',
                	JSON.stringify(addressJsonData)
                , {
                	     headers: {
            				'Content-Type': 'application/json;charset=UTF-8'
        			}
                }
                ).then((res)=>{
                let redirect = decodeURIComponent(_this.$route.query.redirect || '/AddressList/userid');
                _this.$router.push({
                    path: redirect
                });
				},(err)=>{
					console.log('左侧数据' + err);
				})
            }
		}
	}
</script>

<style type="text/css">
	.user_input {
		border: 1px solid;
	}
	.el-input__inner {
		height: 30px !important;
		line-height: 0px !important;
	}
	.el-form-item__error {
		width: 120px !important;
	}
</style>










