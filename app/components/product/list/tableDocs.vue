

<template>

<div class="col-md-12 pd_l0 pd_r0 mg_r0" v-show="!isupdate">
    <tab :data="tablist" :value="-1" ></tab>
    <table class="table table2 table_bg mg_t2" v-if="list.length">
        <thead>
                <tr>
                    <th width="37%">产品信息</th>
                    <th width="10%">供货价</th>
                    <th width="10%" v-if="stype==1">建议销售价</th>
                    <th width="10%">电商销售价格</th>
                    <th width="10%">状态</th>
                    <th width="10%">添加时间</th>
                    <th width="13%">操作</th>
                </tr>
        </thead>
        <tbody v-for="(index,item) in list">
            <tr>
                <td class="poR">
                    <img v-if="item.Imglist&&item.Imglist.length" :src="item.Imglist[0].ImgUrl" class="saas_table_img">
                    <img v-else src="../../../images/noimg.png" class="saas_table_img">
                    <div class="table_detail">
                        <div class="clearfix">
                            <span class="pull-left col_010101 fB">{{item.ProdBrandName}} {{item.StandardName}}</span>
                            <span class="pull-right col_010101 f12">供应商编码：{{item.DealerNo}}</span>
                        </div>
                        <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                            <label class="control-label pull-left f12 poA l_l0 w60">配件说明：</label>
                            <p class="pull-left mg_t2 f12 pd_l65 col_767676">{{item.ContentInfo}}{{item.SpecialNote}}</p>
                        </div>
                        <div class="col-md-12 pd_l0 clearfix mg_t5 select_dropdown">
                            <label class="control-label pull-left f12 w60">零件编号：</label>
                            <a href="#" class="saas_add pull-left f12 mg_l0" @click="showModal(index,1)">查看</a>
                            <label class="control-label pull-left f12 w60 mg_l30" >适用年款：</label>
                            <a href="#" class="saas_add pull-left f12 mg_l0" @click="showModal(index,3)">查看</a>
                            <label class="control-label pull-left f12 w60 mg_l30" v-if="item.SpecialNote">特殊说明：</label>
                            <a href="#" class="saas_add pull-left f12 mg_l0" v-if="item.SpecialNote" @click="showModal(index,6)">查看</a>
                        </div>
                    </div>
                </td>
                <td><span class="col_ed5521">￥</span><em class="fB fS col_ed5521 f18">{{item.InPrice}}</em> </td>
                <td v-if="stype==1"><span class="col_ed5521">￥</span><em class="fB fS col_ed5521 f18">{{item.SalePrice}}</em> </td>
                <td><a href="#" class="saas_add mYH14 mg_l0" @click="showModal(index,5)">查看</a></td>
                <td>
                  <span v-if="item.ProdStatus==0" class="col_000">待审核</span>
                  <span v-if="item.ProdStatus==1" class="col_ed5521">未通过</span>
                  <span class="col_5ca50a" v-if="item.ProdStatus==2">已通过</span>
                  <span class="col_5ca50a" v-if="item.ProdStatus==3">销售中</span>
                </td>
                <td><span class="f12 col_010101">{{item.AddTime}}</span></td>
                <td>
                    <a href="#" class="saas_edi mg_t10" @click='update(index)'>编辑</a>
                    <a href="#" class="saas_del mg_t10" @click='remove(index)'>删除</a>
                    <a href="#" class="saas_cho mg_t10" v-if="item.ProdStatus==2" @click="showModal(index,2)">选择销售平台</a>
                    <a href="#" class="saas_res mg_t10" v-if="item.ProdStatus==1" @click="showModal(index,7)">查看原因</a>
                </td>
            </tr>
        </tbody>

    <nothing v-if="!list.length"></nothing>
</div>

<third :show.sync="showthird" :suitcars="model.SuitCarList" :stockid="model.StockId" :inprice="model.InPrice"></third>
<thirdprice :show.sync="showthirdprice" :stockid="model.StockId"></thirdprice>
<supplement-sku :show.sync="showsku" :list="model.SkuList" :bmno="model.BmNo"></supplement-sku>

<supplement-year v-ref:year :show.sync="showyear" :bmno="model.BmNo" :exists="exists"></supplement-year>

<partsyearlist :show.sync="showyears" :list="model.SuitCarList" :bmno="model.BmNo"></partsyearlist>

<content :show.sync="showcontent" :title="title" :text="content"></content>
</template>

<script>
import tab from '../../general/tabDocs.vue'
import modalcarDocs from '../../general/modalcarDocs.vue'
import nothing from '../../general/nothing.vue'
import convert from '../../utils/convert.js'
import supplementSku from '../../modal/supplementSku.vue';
import third from '../../modal/third.vue';
import thirdprice from '../../modal/thirdprice.vue';
import supplementYear from '../../modal/supplementYear.vue';
import partsyearlist from '../../modal/partsyearlist.vue';
import content from '../../modal/content.vue'
export default {
    components: {
        modalcarDocs,tab,nothing,supplementSku,third, thirdprice,supplementYear, partsyearlist,content
    },
    props: {
        list: {
            type: Array
        },
    },
    data() {
        return {
            tablist:[{val: -1,text:"全部"},{val: 0,text:"待审核"},{val: 1,text:"未通过"},{val: 2,text:"已通过"}],
            first: true,
            stype: document.getElementById('user').getAttribute('stype'),
            showsku: false,
            showthird:false,
            showyear: false,
            showyears: false,
            showthirdprice: false,
            showcontent:false,
            title: "",
            content:"",
            pindex: -1
        }
    },
    ready() {

    },
    computed:{
          model() {
              if ((!this.list.length) || this.pindex==-1) {
                  return {};
              }
              return this.list[this.pindex];
          },
          exists() {
              let arr = [];
              let model = this.model;
              if (!this.list.length || !model.SuitCarList || this.pindex==-1) {
                  return [];
              }

              model.SuitCarList.map(x => arr.push(x.PartsYearId));
              if (model.SupplementSuitcar && model.SupplementSuitcar.length) {
                  model.SupplementSuitcar.map(x => arr.push(x));
              }

              return arr;
            }
    },
    methods: {
          update(index) {
              //派发事件
              this.pindex = index;
              this.$dispatch('update', index)
          },
          showModal(index, type) {
              this.pindex = index;
              switch (type) {
                  case 1:
                      this.showsku = true;
                      break;
                  case 2:
                      this.showthird = true;
                      break;
                  case 3:
                      //获取已补充年款
                      let item=this.list[index];
                      Vue.http.get('/product/GetSuit?bmno=' + item.BmNo).then(function(res) {
                          if (res.data && res.data.length) {
                              item.SupplementSuitcar = res.data;
                          }
                      });
                      this.showyears = true;
                      break;
                  case 4:
                      this.showyeas = true;
                      break;
                  case 5:
                      this.showthirdprice=true;
                      break;
                  case 6:
                      this.showcontent=true;
                      this.title="商品特殊说明";
                      this.content=this.list[index].SpecialNote;
                      break;
                  case 7:
                      this.showcontent=true;
                      this.title="审核未通过原因";
                      this.content=this.list[index].Comment;
                      break;
              }
          },
          remove(index) {
              let _this = this;
              let model = _this.list[index];
              layer.confirm('确认删除吗', {
                  btn: ['删除', '取消'] //按钮
              }, function() {
                  //获取图片列表
                  var imgIds = "";
                  if (model.Imglist.length) {
                      let imgarr = [];
                      model.Imglist.map(x => imgarr.push(x.Id));
                      imgIds = imgarr.join(',');
                  }
                  Vue.http.post(`/product/DeletProduct?id=${model.Id}&ids=${imgIds}&stockid=${model.StockId}`).then(function(response) {
                      layer.msg('删除成功', {
                          icon: 1,
                          time: 800
                      });
                      _this.list.splice(index, 1);
                      if (!_this.list.length) {
                          _this.$nextTick(function() {
                              // DOM 更新了
                              //layer.alert('请点击下一页');
                          })
                      }
                  }, function(response) {
                      layer.msg('删除失败', {
                          icon: 5,
                          time: 800
                      });
                  })
              }, function() {

              })
          },
    }
}

</script>
