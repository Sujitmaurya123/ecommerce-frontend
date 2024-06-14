// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import AdminSidebar from "../../../components/admin/AdminSidebar";
// import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
// import { Skeleton } from "../../../components/loader";
// import { usePieQuery } from "../../../redux/api/dashboardAPI";
// import { RootState } from "../../../redux/store";

// const PieCharts = () => {
//   const { user } = useSelector((state: RootState) => state.userReducer);

//   const { isLoading, data, isError } = usePieQuery(user?._id!);

//   const order = data?.charts.orderFullfillment!;
//   const categories = data?.charts.productCategories!;
//   const stock = data?.charts.stockAvailablity!;
//   const revenue = data?.charts.revenueDistribution!;
//   const ageGroup = data?.charts.usersAgeGroup!;
//   const adminCustomer = data?.charts.adminCustomer!;

//   if (isError) return <Navigate to={"/admin/dashboard"} />;

//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main className="chart-container">
//         <h1>Pie & Doughnut Charts</h1>

//         {isLoading ? (
//           <Skeleton length={20} />
//         ) : (
//           <>
//             <section>
//               <div>
//                 <PieChart
//                   labels={["Processing", "Shipped", "Delivered"]}
//                   data={[order.processing, order.shipped, order.delivered]}
//                   backgroundColor={[
//                     `hsl(110,80%, 80%)`,
//                     `hsl(110,80%, 50%)`,
//                     `hsl(110,40%, 50%)`,
//                   ]}
//                   offset={[0, 0, 50]}
//                 />
//               </div>
//               <h2>Order Fulfillment Ratio</h2>
//             </section>

//             <section>
//               <div>
//                 <DoughnutChart
//                   labels={categories.map((i) => Object.keys(i)[0])}
//                   data={categories.map((i) => Object.values(i)[0])}
//                   backgroundColor={categories.map(
//                     (i) =>
//                       `hsl(${Object.values(i)[0] * 4}, ${
//                         Object.values(i)[0]
//                       }%, 50%)`
//                   )}
//                   legends={false}
//                   offset={[0, 0, 0, 80]}
//                 />
//               </div>
//               <h2>Product Categories Ratio</h2>
//             </section>

//             <section>
//               <div>
//                 <DoughnutChart
//                   labels={["In Stock", "Out Of Stock"]}
//                   data={[stock.inStock, stock.outOfStock]}
//                   backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
//                   legends={false}
//                   offset={[0, 80]}
//                   cutout={"70%"}
//                 />
//               </div>
//               <h2> Stock Availability</h2>
//             </section>

//             <section>
//               <div>
//                 <DoughnutChart
//                   labels={[
//                     "Marketing Cost",
//                     "Discount",
//                     "Burnt",
//                     "Production Cost",
//                     "Net Margin",
//                   ]}
//                   data={[
//                     revenue.marketingCost,
//                     revenue.discount,
//                     revenue.burnt,
//                     revenue.productionCost,
//                     revenue.netMargin,
//                   ]}
//                   backgroundColor={[
//                     "hsl(110,80%,40%)",
//                     "hsl(19,80%,40%)",
//                     "hsl(69,80%,40%)",
//                     "hsl(300,80%,40%)",
//                     "rgb(53, 162, 255)",
//                   ]}
//                   legends={false}
//                   offset={[20, 30, 20, 30, 80]}
//                 />
//               </div>
//               <h2>Revenue Distribution</h2>
//             </section>

//             <section>
//               <div>
//                 <PieChart
//                   labels={[
//                     "Teenager(Below 20)",
//                     "Adult (20-40)",
//                     "Older (above 40)",
//                   ]}
//                   data={[ageGroup.teen, ageGroup.adult, ageGroup.old]}
//                   backgroundColor={[
//                     `hsl(10, ${80}%, 80%)`,
//                     `hsl(10, ${80}%, 50%)`,
//                     `hsl(10, ${40}%, 50%)`,
//                   ]}
//                   offset={[0, 0, 50]}
//                 />
//               </div>
//               <h2>Users Age Group</h2>
//             </section>

//             <section>
//               <div>
//                 <DoughnutChart
//                   labels={["Admin", "Customers"]}
//                   data={[adminCustomer.admin, adminCustomer.customer]}
//                   backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
//                   offset={[0, 50]}
//                 />
//               </div>
//             </section>
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default PieCharts;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { Skeleton } from "../../../components/loader";
import { usePieQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const userId = user?._id || '';

  const { isLoading, data, error, isError } = usePieQuery(userId, {
    skip: !userId,
  });

  const [missingUserId, setMissingUserId] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) {
      setMissingUserId(true);
    } else {
      setMissingUserId(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err?.data?.message || 'An error occurred');
    }
  }, [isError, error]);

  if (missingUserId) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>

        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[data?.charts.orderFullfillment?.processing || 0, data?.charts.orderFullfillment?.shipped || 0, data?.charts.orderFullfillment?.delivered || 0]}
                  backgroundColor={[
                    `hsl(110,80%, 80%)`,
                    `hsl(110,80%, 50%)`,
                    `hsl(110,40%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={data?.charts.productCategories?.map((i) => Object.keys(i)[0]) || []}
                  data={data?.charts.productCategories?.map((i) => Object.values(i)[0]) || []}
                  backgroundColor={data?.charts.productCategories?.map(
                    (i) =>
                      `hsl(${Object.values(i)[0] * 4}, ${
                        Object.values(i)[0]
                      }%, 50%)`
                  ) || []}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2>Product Categories Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[data?.charts.stockAvailablity?.inStock || 0, data?.charts.stockAvailablity?.outOfStock || 0]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2> Stock Availability</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    data?.charts.revenueDistribution?.marketingCost || 0,
                    data?.charts.revenueDistribution?.discount || 0,
                    data?.charts.revenueDistribution?.burnt || 0,
                    data?.charts.revenueDistribution?.productionCost || 0,
                    data?.charts.revenueDistribution?.netMargin || 0,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>

            <section>
              <div>
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[data?.charts.usersAgeGroup?.teen || 0, data?.charts.usersAgeGroup?.adult || 0, data?.charts.usersAgeGroup?.old || 0]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[data?.charts.adminCustomer?.admin || 0, data?.charts.adminCustomer?.customer || 0]}
                  backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  offset={[0, 50]}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
