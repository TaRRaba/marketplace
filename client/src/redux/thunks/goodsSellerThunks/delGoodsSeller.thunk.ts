import { createAsyncThunk } from "@reduxjs/toolkit";


export const delGoodsSeller = createAsyncThunk('goods/delGoodsSeller',
async ({goodsId}: {goodsId:number}) => {
  const response = await fetchGoods(goodsId);
  return response;
}
)

const fetchGoods = async (goodsId:number) => {
     try {
        const response = await fetch('http://localhost:3001/api/seller/goods', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({goodsId}),
          credentials: 'include',
        })
        const result = await response.json();
        if (result.status === 200) {
          return goodsId;
        } 
        return null;
      } catch (error) {
          console.log(error);
      }
};