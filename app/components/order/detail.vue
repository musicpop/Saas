

<template>

<template v-if="show">
    <div class="right_contain1">
        <div class="row">
            <div class="col-md-12 pd_l0 pd_r0 mg_r0">
                <div class="bd_bD_d9 pd_b20 pd_t10">
                    <span class="mg_l20">来源单号：{{model.SourceOrderId}}</span>
                    <span class="mg_l110">订单号：{{model.OrderCode}}</span>
                </div>
                <div class="mg_1 bd_bD_d9">
                    <div class="bg10 h40">
                        <span class="mg_l20">订单状态</span>
                    </div>
                    <div class="poR w620 mg_t20 h150 auto">
                        <ul class="saas_step_tip clearfix">
                            <li>新生成</li>
                            <li>待发货</li>
                            <li>待收货</li>
                            <li>已收货</li>
                        </ul>
                        <div class="saas_step " :class="'saas_step'+step"></div>
                        <ul class="saas_step_time clearfix">
                            <li>【{{model.AddTime}}】</li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <div class="mg_1">
                    <div class="bg10 h40">
                        <span class="mg_l20">订单信息</span>
                    </div>
                    <div class="">
                        <img src="../../images/saas14.png" class="pull-left mg_l70 mg_t20" />
                        <div class="pull-left">
                            <div class="mg_t20 clearfix select_dropdown">
                                <label class="control-label pull-left col_010101 mg_l15">收货地址：</label>
                                <p class="pull-left pd_l0 mg_t2">
                                    <span>{{model.Receiver}}</span>
                                    <span class="mg_l20">{{model.TelPhone}}</span>
                                    <br />
                                    <span>{{model.Address}}</span>
                                </p>
                            </div>
                            <div class="mg_t20 clearfix select_dropdown" v-if="model.ExpressName">
                                <label class="control-label pull-left col_010101 mg_l15">快递信息：</label>
                                <p class="pull-left pd_l0 mg_t2">{{model.ExpressName}}  {{model.ExpressNo}} </p>

                            </div>
                            <div class="col-md-12 mg_t10 clearfix select_dropdown" v-if="model.Memo">
                                <label class="control-label pull-left col_010101">订单备注：</label>
                                <p class="pull-left pd_l0 mg_t2">{{model.Memo}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="right_contain1 mg_t15 mg_b20">
        <div class="row">
            <div class="col-md-12 pd_l0 pd_r0 mg_r0">
                <div class="bdB_d0d0d0 pd_b20 pd_t10">
                    <span class="mg_l20">商品信息</span>
                </div>
                <table class="table table2 table_bg mg_t2">
                    <thead>
                        <tr>
                            <th width="55%">产品信息</th>
                            <th width="15%">京东价</th>
                            <th width="15%">数量</th>
                            <!-- <th width="15%">库位</th> -->
                        </tr>
                    </thead>
                    <tbody v-for="detail in model.OrderDetails">
                        <tr>
                            <td class="poR">
                                <img v-if="detail.SmallPic" :src="detail.SmallPic" class="saas_table_img">
                                <img v-else src="../../images/noimg.png" class="saas_table_img">
                                <div class="table_detail">
                                    <div class="clearfix">
                                        <span class="pull-left col_010101 fB">{{detail.ProdBrandName+" "+detail.ProdName}}</span>
                                        <span class="pull-right col_010101 f12">供应商编码：{{detail.DealerProdNo}}</span>
                                    </div>
                                    <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                                        <label class="control-label pull-left f12 poA l_l0 w60">配件说明：</label>
                                        <p class="pull-left mg_t2 f12 pd_l65 col_767676">{{detail.ContentInfo}}</p>
                                    </div>
                                    <div class="col-md-12 pd_l0 clearfix mg_t5 select_dropdown">
                                        <!-- <label class="control-label pull-left f12 w80">零件编号</label>
                                        <span class="saas_add pull-left f12 mg_l0 mg_t2">
                                          <a href="#" class="saas_add pull-left f12 mg_l0">查看</a>
                                        </span> -->
                                        <label class="control-label pull-left f12 w60 ">商品年款：</label>
                                        <span class="saas_add pull-left f12 mg_l0 mg_t2">{{detail.FactoryName}} {{detail.CarModelName}} {{detail.CarYearName}}</span>
                                    </div>
                                </div>
                            </td>
                            <td><span class="col_ed5521">￥</span><em class="fB fS col_ed5521 f18">{{detail.SalePrice}}</em> </td>
                            <td>{{detail.Quantity}}</td>
                            <!-- <td>01-01-01</td> -->
                        </tr>
                    </tbody>
                </table>
                <div class="text-right">
                    <span>商品总金额：</span>
                    <span class="col_ed5521">￥</span><em class="fB fS col_ed5521 f18 mg_r50">{{model.ProductAmount}}</em>
                </div>
                <div class="text-center" v-if="model.OrderStatus<=2&&model.OrderStatus>=0">
                  <a href="#" class="btn_red bg8 f14 w120 h30  mg_t20 mg_b20 in-block" @click="delivery">去发货</a>
                  <a href="#" class="btn_green bg8 f14 w120 h30  mg_l20 mg_t20 mg_b20 in-block" @click="show=false">返回</a>
                </div>
                <a href="#" v-else class="btn_red bg8 f14 w120 h30 auto mg_t20 mg_b20" @click="show=false">返回</a>

</template>
</template>

<script>
export default {
    components: {},
    props: {
        model: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            //model : {}
        }
    },
    methods: {
      delivery(){
        this.show=false;
        this.$dispatch('todelivery', 0)
      }
    },
    computed:{
      step(){
        let state=this.model.OrderStatus;
        if(state<=2&&state>=0){
          return 1;
        }else if(state==3){
          return 2;
        }else if(state>=4){
          return 4;
        }else{
          return 0;
        }
        // switch (this.model.OrderStatus) {
        //   case 2:
        //     return 3;
        //       break;
        //   case 3:
        //     return 4;
        //       break;
        //   case 9:
        //     return 4;
        //   default:
        //     return 1;
        // }
      }
    }
}

</script>
