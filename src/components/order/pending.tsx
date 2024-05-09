import React, {useEffect, useState} from 'react';
import {useOrdersQuery} from '../../handlers/information/use-orders';
import {useCouriersQuery} from '../../handlers/information/use-couriers';
import {useUiContext} from "../../context/uı-context";

interface Order {
    id: string
    address: string;
    payment: string;
    delivery_time: string
    status: string
    items: []
}

export const Pending = () => {
    const {data: orders} = useOrdersQuery();
    const {data: couriers} = useCouriersQuery();
    const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
    const [cartItems, setCartItems] = useState<Order[]>([]);
    const {
        selectedStatus,
        updateSelectedStatus,
        updateSelectedOrders,
        selectedCouriers,
        updateSelectedCouriers
    } = useUiContext();

    const handleToggleOrder = (order: Order) => {
        setSelectedOrders(prevOrders => {
            const orderIndex = prevOrders.findIndex(o => o.id === order.id);
            if (orderIndex !== -1) {
                return prevOrders.filter(o => o.id !== order.id);
            } else {
                return [...prevOrders, order];
            }
        });
    };

    useEffect(() => {
        const fetchedOrders = orders || [];
        setCartItems(fetchedOrders.filter((order: Order) => selectedOrders.includes(order)));
        updateSelectedOrders(selectedOrders);
    }, [orders, selectedOrders, updateSelectedOrders]);

    return (
        <div>
            {cartItems.length > 0 && (
                <div className='border rounded-md border-gray-700 p-2'>
                    <div className='flex justify-between items-center p-2'>
                        <span className='font-semibold text-base'>Sepet</span>
                        {selectedCouriers.length > 0 && (
                            <select
                                value={selectedStatus}
                                className='border rounded-md border-gray-700 p-2 mb-2'
                                onChange={(e) => {
                                    updateSelectedStatus(e.target.value);
                                }}
                            >
                                <option disabled>Durumu Seçin</option>
                                <option value='PREPARING'>Hazırlanıyor</option>
                                <option value='ON_THE_WAY'>Yolda</option>
                                <option disabled value='COMPLETE'>Tamamlandı</option>
                            </select>
                        )}
                    </div>
                    {cartItems.map((item) => (
                        <ul key={item.id} className='p-6 border border-red-400 rounded-md mb-3 list-disc'>
                            <li>{item.address}</li>
                            <li>{item.payment}</li>
                            {item.items.map((item: any) => (
                                <li key={item.id} className='mr-2'>{item.name}</li>
                            ))}
                        </ul>
                    ))}
                    <select className='flex justify-center w-full text-center font-semibold p-2 rounded-lg border text-white bg-red-600 border-red-600'
                            value={selectedCouriers.map(courier => courier.name).join(',')} onChange={(e) => {
                        const selectedCourierNames = e.target.value.split(',');
                        const selectedCourierObjects = selectedCourierNames.map(courierName => ({
                            name: courierName
                        }));
                        updateSelectedCouriers(selectedCourierObjects);
                    }}>
                        <option value="">Kurye Seçin</option>
                        {couriers && couriers.map((courier: any) => (
                            <option key={courier.id} value={courier.name}>
                                {courier.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {orders &&
                orders.map((order: Order, index:number) => (
                    <div key={order.id} className='p-4 flex flex-row items-center border-b border-gray-700'>
                        <input
                            id={order.id}
                            className='w-6 h-6 mr-3'
                            type='checkbox'
                            checked={selectedOrders.includes(order)}
                            onChange={() => handleToggleOrder(order)}
                        />
                        <label htmlFor={order.id}>
                            <span className='font-semibold text-base'>{`Sipariş ${index + 1}`}</span>
                            <ul className='list-disc ml-2'>
                                <li>{order.address}</li>
                                <li>{order.payment}</li>
                                {order.items.map((item: any) => (
                                    <li key={item.id} className='mr-2'>{item.name}</li>
                                ))}
                            </ul>
                        </label>
                    </div>
                ))}
        </div>
    );
};
