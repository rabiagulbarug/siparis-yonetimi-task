Installation

1. Clone the repository:

   ```sh
   git clone git@github.com:rabiagulbarug/siparis-yonetimi-task.git
   ```

2. Navigate to the project directory:

   ```sh
   cd siparis-yonetimi-task
   ```

3. Install dependencies:

   ```sh
   yarn install
   ```

### Running the Application

To start the development server:

```sh
yarn start
```

## Technologies

- **React 18**: For building a dynamic, high-performance web application.
- **React Query**: To efficiently manage and synchronize asynchronous data.
- **Axios**: For making HTTP requests.
- **Tailwind CSS**: For styling and responsive design.

## Deploy on Vercel

Deploy Link https://siparis-yonetimi-task.vercel.app/


## Detail

- **EN** : The project was developed for an order management system. In the "Pending Orders" tab, orders should be
  selected. As a second step, a courier must be selected. After selecting the courier, a select option will appear to
  change the order status, and it should be changed to "On the Way". In the "On the Way" tab, there is a checkbox for
  each order indicating delivery. If the checkbox is not checked, it means the order has not been delivered. Clicking on
  each order here will open an order detail modal. When the order is delivered and the checkbox is checked, the order is
  recorded as delivered. When the option is select to "Completed", the order moves to the "Completed Orders" tab.

- **TR** : Proje sipariş yönetim sistemi için geliştirildi. "Bekleyen Siparişler" sekmesinde siparişlerin seçilmesi
  gerekmektedir. İkinci adım olarak kurye seçimi yapılmalıdır. Kuryeyi seçtikten sonra sipariş durumunu değiştirmek için
  bir seçim seçeneği görünecektir ve "Yolda" olarak değiştirilmelidir. "Yolda" sekmesinde her sipariş için teslimatı
  belirten bir onay kutusu bulunur. Onay kutusu işaretlenmemişse siparişin teslim edilmediği anlamına gelir.Onay kutusu
  işaretlendiğinde sipariş teslim edildi olarak kaydedilir. Buradaki her siparişe tıkladığınızda bir sipariş detayı
  modalı açılacaktır.
  Seçenek "Tamamlandı" olarak değiştirildiğinde sipariş "Tamamlanan Siparişler"
  sekmesine taşınır.
