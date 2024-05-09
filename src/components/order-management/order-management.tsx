import { useEffect, useState } from "react";
import { Pending } from "../order/pending";
import { OnTheWay } from "../order/on-the-way";
import { Complete } from "../order/complete";
import { useUiContext } from "../../context/uı-context";

export const OrderManagement = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const { selectedStatus } = useUiContext();

    useEffect(() => {
        switch (selectedStatus) {
            case 'PREPARING':
                setActiveTab('pending');
                break;
            case 'ON_THE_WAY':
                setActiveTab('on-the-way');
                break;
            case 'COMPLETE':
                setActiveTab('complete');
                break;
            default:
                setActiveTab('pending');
        }
    }, [selectedStatus]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='p-6'>
            <ul className='flex'>
                <li className='mr-1'>
                    <button onClick={() => handleTabClick('pending')} className={`inline-block py-2 px-4 ${
                        activeTab === 'pending'
                            ? 'bg-white text-red-600 border-b-2 border-red-600 '
                            : 'text-gray-900'
                    }`}>
                        Bekleyen Siparişler
                    </button>
                </li>
                <li className=''>
                    <button onClick={() => handleTabClick('on-the-way')}
                            className={`inline-block py-2 px-4 ${
                                activeTab === 'on-the-way'
                                    ? 'bg-white text-red-600 border-b-2 border-red-600 '
                                    : 'text-gray-900'
                            }`}>
                        Yoldaki Siparişler
                    </button>
                </li>
                <li className=''>
                    <button onClick={() => handleTabClick('complete')}
                            className={`inline-block py-2 px-4 ${
                                activeTab === 'complete'
                                    ? 'bg-white text-red-600 border-b-2 border-red-600 '
                                    : 'text-gray-900'
                            }`}>
                        Tamamlanmış Siparişler
                    </button>
                </li>
            </ul>
            <div className='w-full mt-5 rounded-lg'>
                {activeTab === 'pending' && (
                    <Pending/>
                )}
                {activeTab === 'on-the-way' && (
                    <OnTheWay/>
                )}
                {activeTab === 'complete' && (
                    <Complete/>
                )}
            </div>
        </div>
    )
}
