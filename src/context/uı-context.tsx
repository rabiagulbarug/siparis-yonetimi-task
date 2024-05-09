import React, {createContext, PropsWithChildren, useContext, useState} from 'react';

export interface Courier {
    name: string;
}

export interface Order {
    id: string
    address: string;
    payment: string;
    delivery_time: string
    status: string
    items: []
}

interface UiContextType {
    selectedStatus: string;
    selectedCouriers: Courier[];
    selectedOrders: Order[];
    updateSelectedStatus: (newStatus: string) => void;
    updateSelectedCouriers: (newCouriers: Courier[]) => void;
    updateSelectedOrders: (orderIds: Order[]) => void;
    orderStatus: { [key: string]: boolean };
    updateOrderStatus: (orderId: string) => void;
}

export const UiContext = createContext<UiContextType>({
    selectedStatus: '',
    selectedCouriers: [],
    selectedOrders: [],
    updateSelectedStatus: () => {
    },
    updateSelectedCouriers: () => {
    },
    updateSelectedOrders: () => {
    },
    orderStatus: {},
    updateOrderStatus: () => {
    },
});

export const UiContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedCouriers, setSelectedCouriers] = useState<Courier[]>([]);
    const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
    const [orderStatus, setOrderStatus] = useState<{ [key: string]: boolean }>({});

    const updateSelectedStatus = (newStatus: string) => {
        setSelectedStatus(newStatus);
    };

    const updateSelectedCouriers = (newCouriers: Courier[]) => {
        setSelectedCouriers(newCouriers);
    };

    const updateSelectedOrders = (orderIds: Order[]) => {
        setSelectedOrders(orderIds);
    };

    const updateOrderStatus = (orderId: string) => {
        // Önce siparişin varlığını kontrol edin
        if (selectedOrders.find(order => order.id === orderId)) {
            setOrderStatus(prevState => ({
                ...prevState,
                [orderId]: !prevState[orderId],
            }));
        } else {
            console.error("Sipariş bulunamadı:", orderId);
        }
    };

    return (
        <UiContext.Provider
            value={{
                selectedCouriers,
                selectedStatus,
                selectedOrders,
                updateSelectedCouriers,
                updateSelectedStatus,
                updateSelectedOrders,
                orderStatus,
                updateOrderStatus,
            }}
        >
            {children}
        </UiContext.Provider>
    );
};

export const useUiContext = () => useContext(UiContext);
