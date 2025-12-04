# Zab Shift Client

A modern React-based delivery management web application for riders, users, and administrators to manage parcel deliveries efficiently.

## Live Link


## 🚀 Features

- **User Authentication**: Firebase-based authentication system
- **Dashboard**: Role-based dashboards for Admin, Rider, and User
- **Parcel Management**: Create, track, and manage parcels
- **Rider Management**: Approve and manage riders
- **Payment Integration**: Stripe payment processing
- **Real-time Tracking**: Track parcel delivery status
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Animations**: Smooth animations with Animate.css


## 🧪 Key Components

### Authentication
- `useAuth`: Custom hook for Firebase authentication
- `useRole`: Custom hook to get user role
- `useAxiosSecure`: Secure axios instance with token

### Pages
- **Home**: Landing page with banner, brands, and how-it-works
- **Register**: User registration with photo upload
- **Login**: User authentication
- **Dashboard**: Role-based dashboard with different views
- **AddParcel**: Create new parcel for delivery
- **Coverage**: View delivery coverage on interactive map
- **AssignedDeliveries**: Rider's assigned delivery list

## 📦 Dependencies

- **React**: UI library
- **React Router**: Routing and navigation
- **Axios**: HTTP client
- **React Hook Form**: Form management
- **React Query**: Data fetching and caching
- **Stripe**: Payment processing
- **Firebase**: Authentication
- **Leaflet**: Map library
- **SweetAlert2**: User alerts
- **Swiper**: Carousel component
- **Tailwind CSS**: Utility-first CSS
- **Animate.css**: CSS animations

## 🔑 Main Features Explained

### Parcel Management
Users can:
- Create new parcels with sender/receiver details
- Select divisions and districts
- Choose parcel type (document/non-document)
- Calculate delivery costs automatically
- Track parcels in real-time

### Rider Dashboard
Riders can:
- View assigned deliveries
- Accept or reject deliveries
- Mark parcels as picked up
- Mark parcels as delivered
- Track delivery history

### Admin Dashboard
Admins can:
- Approve pending riders
- Manage users
- View delivery statistics
- Monitor parcel status

## 💳 Payment Flow

1. User creates parcel and proceeds to checkout
2. Redirects to Stripe payment gateway
3. Upon successful payment:
   - Parcel status changes to "pending-pickup"
   - Transaction recorded in database
   - Tracking ID generated
4. Payment confirmation sent to user email

## 🗺️ Coverage Map

Interactive map showing:
- 64 districts coverage
- Search functionality by district
- Real-time district information
- Click on markers for details

## 🎨 Styling

- **Tailwind CSS**: Main styling framework
- **DaisyUI**: Component library
- **Animate.css**: Animations


## 🔒 Security

- Firebase authentication for all users
- Protected routes based on user roles
- Secure API endpoints with token verification
- Environment variables for sensitive data


## 🚀 Deployment

- Vercel
---
**Last Updated**: December 2025