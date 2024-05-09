import React, {useContext, useState} from "react";
import {Courier, Order, UiContext} from "../../context/uı-context";
import {useBasketsQuery} from "../../handlers/information/use-baskets";


export const OnTheWay = () => {
    const {data: baskets} = useBasketsQuery();
    const {
        selectedStatus,
        selectedCouriers,
        orderStatus,
        selectedOrders,
        updateSelectedStatus,
        updateOrderStatus
    } = useContext(UiContext);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    console.log(baskets)

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className='border rounded-md border-gray-700 p-3'>
            {selectedStatus === 'ON_THE_WAY' && (
                <div>
                    <div className='flex justify-between items-center'>
                        <span className='font-semibold text-base'>Sepet</span>
                        <select
                            value={selectedStatus}
                            className='border rounded-md p-2 mb-2 border-gray-700'
                            onChange={(e) => {
                                updateSelectedStatus(e.target.value);
                            }}
                        >
                            <option disabled>Durumu Seçin</option>
                            <option disabled value='PREPARING'>Hazırlanıyor</option>
                            <option disabled value='ON_THE_WAY'>Yolda</option>
                            <option value='COMPLETE'>Tamamlandı</option>
                        </select>
                    </div>
                    {selectedOrders.map((order: Order) => (
                        <div className='flex flex-row mb-2' key={order.id}>
                            <ul className='border rounded-md border-red-600 w-10/12 p-5 list-disc' onClick={() => handleOrderClick(order)}>
                                <li>{order.address}</li>
                                <li>{order.payment}</li>
                                {order.items.map((item: any) => (
                                    <li key={item.id} className='mr-2'>{item.name}</li>
                                ))}
                            </ul>
                            <div className='w-2/12 flex justify-center items-center'>
                                <input
                                    className='w-6 h-6 mr-2'
                                    type="checkbox"
                                    checked={orderStatus[order.id]}
                                    onChange={() => updateOrderStatus(order.id)}
                                />
                                {orderStatus[order.id] ? (
                                    <span style={{color: 'green'}}>Teslim Edildi</span>
                                ) : (
                                    <span style={{color: 'red'}}>Teslim Edilmedi</span>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className='flex justify-center font-semibold w-full text-center p-2 rounded-lg border text-white bg-red-600 border-red-600'>
                        {selectedCouriers.map((courier: Courier, index: number) => (
                            <div key={index}>Kurye : {courier.name}</div>
                        ))}
                    </div>
                    {selectedOrder && (
                        <div
                            className="fixed z-10 top-0 right-0 w-full bg-gray-500 h-full bg-opacity-20 flex justify-center items-center">
                            <div className="bg-white lg:w-1/3 sm:w-3/4 md:3/4 border p-4 rounded-md">
                                <div className='flex justify-between'>
                                    <span className='font-semibold text-lg'>Sipariş Detayları</span>
                                    <span className="close" onClick={closeModal}>&times;</span>
                                </div>
                                <p><span className='font-semibold'>Adres:</span> {selectedOrder.address}</p>
                                <p><span className='font-semibold'>Ödeme Miktarı:</span> {selectedOrder.payment}</p>
                                <p>
                                    <span className='font-semibold'>Sipariş Tarihi:</span>{" "}
                                    {new Date(selectedOrder.delivery_time).toLocaleString()}
                                </p>
                                <p>
                                    <span className='font-semibold'>Ürünler:</span>
                                    {selectedOrder.items.map((item: any) => (
                                        <p key={item.id}>{item.name}</p>
                                    ))}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
