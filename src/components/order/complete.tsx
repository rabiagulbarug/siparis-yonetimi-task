import React, {useContext} from "react";
import {Courier, Order, UiContext} from "../../context/uı-context";

export const Complete = () => {
    const {selectedStatus, selectedCouriers, selectedOrders, orderStatus} = useContext(UiContext);
    console.log(orderStatus)

    return (
        <div className='border border-gray-700 rounded-md p-3'>
            {selectedStatus === 'COMPLETE' &&
                <div>
                    <div className='mb-2 font-semibold'>Sipariş Durumu : Tamamlandı</div>
                    {selectedOrders.map((order: Order) => (
                        <ul key={order.id} className='border border-red-600 p-6 mb-2 rounded-md list-disc'>
                            <li>{order.address}</li>
                            <li>{order.payment}</li>
                            {order.items.map((item: any) => (
                                <li key={item.id} className='mr-2'>{item.name}</li>
                            ))}
                            <li style={{ color: orderStatus[order.id] ? 'green' : 'red' }}>
                                {orderStatus[order.id] ? 'Teslim edildi' : 'Teslim Edilemedi'}
                            </li>
                        </ul>
                    ))}
                    <div className='flex justify-center font-semibold w-full text-center p-2 rounded-lg border text-white bg-red-600 border-red-600'>
                        {selectedCouriers.map((courier: Courier, index: number) => (
                            <div key={index}>Kurye : {courier.name}</div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}
