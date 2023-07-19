import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useMonsaiseProductsQuery } from '@/redux/features/product/productApi';
import {
  setPriceRange,
  togglestate,
} from '@/redux/features/product/productSlice';
import { useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useDispatch } from 'react-redux';

export default function Products() {
  // Fetch data using RTK query
  const { data, isFetching } = useMonsaiseProductsQuery(undefined);

  // const { toast } = useToast();

  const dispatch = useDispatch();
  const { status, priceRange } = useAppSelector((state) => state.product);

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };
  if (isFetching) {
    return (
      <h1 className="text-5xl font-bold text-red-800 text-center mt-40">
        Loading...
      </h1>
    );
  }
  let productsData;

  if (status) {
    // console.log(data, 'if condition data');
    productsData = data?.data.filter(
      (item: { status: boolean; price: number }) =>
        item.status === true && item.price < priceRange
    );
  } else if (priceRange > 0) {
    // console.log(data, 'else if second condition data', isFetching);
    productsData = data?.data.filter(
      (item: { price: number }) => item.price < priceRange
    );
  } else {
    // console.log(data, 'else if last condition data');
    productsData = data?.data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div
            className="flex items-center space-x-2 mt-3"
            onClick={() => dispatch(togglestate())}
          >
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[150]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {priceRange}$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product: IProduct, i: number) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
}
