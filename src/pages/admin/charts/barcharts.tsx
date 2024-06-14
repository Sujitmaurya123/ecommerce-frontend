// import { useSelector } from "react-redux";
// import AdminSidebar from "../../../components/admin/AdminSidebar";
// import { BarChart } from "../../../components/admin/Charts";
// import { RootState } from "../../../redux/store";
// import { useBarQuery } from "../../../redux/api/dashboardAPI";
// import { CustomError } from "../../../types/api-types";
// import toast from "react-hot-toast";
// import { Skeleton } from "../../../components/loader";
// import { getLastMonths } from "../../../utils/features";

// const { last12Months, last6Months } = getLastMonths();

// const Barcharts = () => {
//   const { user } = useSelector((state: RootState) => state.userReducer);

//   const { isLoading, data, error, isError } = useBarQuery(user?._id);

//   const products = data?.charts.products || [];
//   const orders = data?.charts.orders || [];
//   const users = data?.charts.users || [];

//   if (isError) {
//     const err = error as CustomError;
//     toast.error(err.data.message);
//   }

//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main className="chart-container">
//         <h1>Bar Charts</h1>
//         {isLoading ? (
//           <Skeleton length={20} />
//         ) : (
//           <>
//             <section>
//               <BarChart
//                 data_1={products}
//                 data_2={users}
//                 labels={last6Months}
//                 title_1="Products"
//                 title_2="Users"
//                 bgColor_1={`hsl(260, 50%, 30%)`}
//                 bgColor_2={`hsl(360, 90%, 90%)`}
//               />
//               <h2>Top Products & Top Customers</h2>
//             </section>

//             <section>
//               <BarChart
//                 horizontal={true}
//                 data_1={orders}
//                 data_2={[]}
//                 title_1="Orders"
//                 title_2=""
//                 bgColor_1={`hsl(180, 40%, 50%)`}
//                 bgColor_2=""
//                 labels={last12Months}
//               />
//               <h2>Orders throughout the year</h2>
//             </section>
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Barcharts;

import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { RootState } from "../../../redux/store";
import { useBarQuery } from "../../../redux/api/dashboardAPI";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../../components/loader";
import { getLastMonths } from "../../../utils/features";
import { useEffect, useState } from "react";

const { last12Months, last6Months } = getLastMonths();

const Barcharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  // Use a state to store whether the user ID is missing
  const [missingUserId, setMissingUserId] = useState<boolean>(false);

  const userId = user?._id || '';

  const { isLoading, data, error, isError } = useBarQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (!userId) {
      setMissingUserId(true);
      return;
    }
    setMissingUserId(false);
  }, [userId]);

  useEffect(() => {
    if (isError && error) {
      const err = error as CustomError;
      toast.error(err?.data?.message || 'An error occurred');
    }
  }, [isError, error]);

  if (missingUserId) {
    return <p>User ID is missing. Please log in to view the data.</p>;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <BarChart
                data_1={data?.charts.products || []}
                data_2={data?.charts.users || []}
                labels={last6Months}
                title_1="Products"
                title_2="Users"
                bgColor_1={`hsl(260, 50%, 30%)`}
                bgColor_2={`hsl(360, 90%, 90%)`}
              />
              <h2>Top Products & Top Customers</h2>
            </section>

            <section>
              <BarChart
                horizontal={true}
                data_1={data?.charts.orders || []}
                data_2={[]}
                title_1="Orders"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={last12Months}
              />
              <h2>Orders throughout the year</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Barcharts;
