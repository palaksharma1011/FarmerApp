"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Truck, Users, Shield, MapPin, Thermometer, Scale, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error';
  message: string;
  time: string;
}

interface Activity {
  id: string;
  type: 'truck_departure' | 'approval' | 'temperature_alert' | 'delivery';
  message: string;
  time: string;
  location?: string;
}

export default function LandingPage() {
  const [notifications] = useState<Notification[]>([
    { id: '1', type: 'success', message: 'New crop request approved', time: '2 min ago' },
    { id: '2', type: 'warning', message: 'Temperature alert in Truck TN-123', time: '5 min ago' },
    { id: '3', type: 'success', message: 'Delivery completed - Order #456', time: '15 min ago' },
  ]);

  const [recentActivity] = useState<Activity[]>([
    { id: '1', type: 'truck_departure', message: 'Truck KA-789 departed from Bangalore', time: '10 min ago', location: 'Bangalore, Karnataka' },
    { id: '2', type: 'approval', message: 'Wheat crop request approved for Farmer ID: MH12345', time: '25 min ago' },
    { id: '3', type: 'temperature_alert', message: 'Temperature spike detected in cold storage unit', time: '45 min ago' },
    { id: '4', type: 'delivery', message: 'Successful delivery to Mumbai market', time: '1 hour ago', location: 'Mumbai, Maharashtra' },
  ]);

  const [pendingWork] = useState([
    { id: '1', title: 'Review 15 crop approval requests', priority: 'high', count: 15 },
    { id: '2', title: 'Monitor 8 active truck routes', priority: 'medium', count: 8 },
    { id: '3', title: 'Temperature alerts requiring attention', priority: 'high', count: 3 },
    { id: '4', title: 'Pending farmer verifications', priority: 'low', count: 12 },
  ]);

  const stats = [
    { title: 'Active Trucks', value: '247', icon: Truck, change: '+12%', color: 'text-blue-600' },
    { title: 'Registered Farmers', value: '15,248', icon: Users, change: '+8%', color: 'text-green-600' },
    { title: 'Secure Deliveries', value: '98.7%', icon: Shield, change: '+2%', color: 'text-emerald-600' },
    { title: 'Active Routes', value: '156', icon: MapPin, change: '+5%', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <div className="flex size-16 items-center justify-center rounded-md">
                <Image
                  src="/assets/logo.png"
                  alt="farmBazaar Logo"
                  width={64}
                  height={64}
                  className="rounded-md"
                />
              </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FarmBazaar</h1>
                <p className="text-sm text-gray-600">Agricultural Supply Chain Monitoring System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                
                <Link href="govt/signin">Login</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Link href="govt/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Secure Agricultural Supply Chain
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Real-time monitoring of agricultural products from farm to consumer with GPS tracking, 
            temperature sensors, and weight verification for secure delivery.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Link href="/govt/dashboard">Government Portal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.color} font-medium`}>{stat.change}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Notifications */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
                <Bell className="w-5 h-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'success' ? 'bg-green-500' :
                        notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <CheckCircle2 className="w-5 h-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'truck_departure' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'approval' ? 'bg-green-100 text-green-600' :
                        activity.type === 'temperature_alert' ? 'bg-red-100 text-red-600' :
                        'bg-emerald-100 text-emerald-600'
                      }`}>
                        {activity.type === 'truck_departure' && <Truck className="w-4 h-4" />}
                        {activity.type === 'approval' && <CheckCircle2 className="w-4 h-4" />}
                        {activity.type === 'temperature_alert' && <Thermometer className="w-4 h-4" />}
                        {activity.type === 'delivery' && <Shield className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        {activity.location && (
                          <p className="text-xs text-blue-600">{activity.location}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Work */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">Pending Work</CardTitle>
                <AlertTriangle className="w-5 h-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingWork.map((work) => (
                    <div key={work.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{work.title}</p>
                        <Badge variant={
                          work.priority === 'high' ? 'destructive' :
                          work.priority === 'medium' ? 'default' : 'secondary'
                        } className="text-xs mt-1">
                          {work.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{work.count}</p>
                        <p className="text-xs text-gray-500">items</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">System Features</h3>
            <p className="text-xl text-gray-600">Advanced monitoring and tracking capabilities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">GPS Tracking</h4>
              <p className="text-gray-600">Real-time location monitoring of all vehicles in the supply chain</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <Thermometer className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Temperature Control</h4>
              <p className="text-gray-600">Continuous monitoring to prevent spoilage and ensure quality</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Weight Monitoring</h4>
              <p className="text-gray-600">Automated weight verification to prevent theft and ensure accuracy</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure Delivery</h4>
              <p className="text-gray-600">End-to-end security ensuring safe delivery from farm to consumer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-xl font-bold">AgriTrack India</h4>
          </div>
          <p className="text-gray-400 mb-6">
            Government of India - Ministry of Agriculture & Farmers Welfare
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 AgriTrack India. All rights reserved. Developed for secure agricultural supply chain management.
          </p>
        </div>
      </footer> */}
    </div>
  );
}