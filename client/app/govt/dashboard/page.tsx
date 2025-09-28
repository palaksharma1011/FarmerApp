"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Bell, Search, Truck, Users, Shield, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Circle as XCircle, Clock, MapPin, Thermometer, Scale, Eye, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface TruckData {
  id: string;
  licensePlate: string;
  currentLocation: string;
  destination: string;
  cropType: string;
  farmerId: string;
  farmerName: string;
  weight: number;
  temperature: number;
  status: 'active' | 'alert' | 'delivered';
  lastUpdate: string;
  estimatedArrival: string;
}

interface CropRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  cropType: string;
  variety: string;
  quantity: number;
  expectedPrice: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  harvestDate: string;
  qualityGrade: string;
  location: string;
}

export default function GovernmentDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  const [trucks] = useState<TruckData[]>([
    {
      id: 'T001',
      licensePlate: 'MH12AB1234',
      currentLocation: 'Pune, MH',
      destination: 'Mumbai Market',
      cropType: 'Rice',
      farmerId: 'MH12345',
      farmerName: 'Ramesh Kumar',
      weight: 500,
      temperature: 22,
      status: 'active',
      lastUpdate: '2 min ago',
      estimatedArrival: '2 hours'
    },
    {
      id: 'T002',
      licensePlate: 'KA05CD5678',
      currentLocation: 'Bangalore, KA',
      destination: 'Chennai Market',
      cropType: 'Cotton',
      farmerId: 'KA67890',
      farmerName: 'Suresh Reddy',
      weight: 300,
      temperature: 35,
      status: 'alert',
      lastUpdate: '1 min ago',
      estimatedArrival: '4 hours'
    },
    {
      id: 'T003',
      licensePlate: 'UP14EF9012',
      currentLocation: 'Delhi Market',
      destination: 'Delivered',
      cropType: 'Wheat',
      farmerId: 'UP11223',
      farmerName: 'Vijay Singh',
      weight: 450,
      temperature: 18,
      status: 'delivered',
      lastUpdate: '15 min ago',
      estimatedArrival: 'Delivered'
    }
  ]);

  const [cropRequests] = useState<CropRequest[]>([
    {
      id: 'CR001',
      farmerId: 'TN11111',
      farmerName: 'Murugan S',
      cropType: 'Rice',
      variety: 'Ponni',
      quantity: 600,
      expectedPrice: 28,
      status: 'pending',
      submittedAt: '2024-01-20',
      harvestDate: '2024-01-25',
      qualityGrade: 'A',
      location: 'Thanjavur, TN'
    },
    {
      id: 'CR002',
      farmerId: 'GJ22222',
      farmerName: 'Kiran Patel',
      cropType: 'Cotton',
      variety: 'Bt Cotton',
      quantity: 400,
      expectedPrice: 50,
      status: 'pending',
      submittedAt: '2024-01-19',
      harvestDate: '2024-01-28',
      qualityGrade: 'A+',
      location: 'Ahmedabad, GJ'
    },
    {
      id: 'CR003',
      farmerId: 'PB33333',
      farmerName: 'Harpreet Singh',
      cropType: 'Wheat',
      variety: 'Sharbati',
      quantity: 800,
      expectedPrice: 24,
      status: 'approved',
      submittedAt: '2024-01-18',
      harvestDate: '2024-01-22',
      qualityGrade: 'A',
      location: 'Ludhiana, PB'
    }
  ]);

  const stats = {
    activeTrucks: trucks.filter(t => t.status === 'active').length,
    alertTrucks: trucks.filter(t => t.status === 'alert').length,
    totalFarmers: 15248,
    pendingRequests: cropRequests.filter(r => r.status === 'pending').length,
    approvedToday: 45,
    securityIncidents: 2
  };

  const handleApproveRequest = (requestId: string) => {
    console.log('Approving request:', requestId);
    // In real app, would update backend
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejecting request:', requestId);
    // In real app, would update backend
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'alert': return 'bg-red-100 text-red-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
            <div className="flex size-16 items-center justify-center rounded-md">
                <Image
                  src="/assets/logo.png"
                  alt="farmBazaar Logo"
                  width={64}
                  height={64}
                  className="rounded-md"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Government Dashboard</h1>
                <p className="text-sm text-gray-800">Agricultural Supply Chain Monitoring</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-800 uppercase tracking-wide">Active Trucks</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeTrucks}</p>
                </div>
                <Truck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-800 uppercase tracking-wide">Alerts</p>
                  <p className="text-2xl font-bold text-red-600">{stats.alertTrucks}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-800 uppercase tracking-wide">Farmers</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalFarmers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-800 uppercase tracking-wide">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-800 uppercase tracking-wide">Approved</p>
                  <p className="text-2xl font-bold text-emerald-600">{stats.approvedToday}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-800 uppercase tracking-wide">Security</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.securityIncidents}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="w-full overflow-x-auto">
            <TabsList className="grid min-w-max grid-cols-4 mb-8 bg-gray-100">
              <TabsTrigger value="overview" className="data-[state=inactive]:text-gray-700 data-[state=active]:text-gray-900">Live Tracking</TabsTrigger>
              <TabsTrigger value="requests" className="data-[state=inactive]:text-gray-700 data-[state=active]:text-gray-900">Crop Requests</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=inactive]:text-gray-700 data-[state=active]:text-gray-900">Analytics</TabsTrigger>
              <TabsTrigger value="security" className="data-[state=inactive]:text-gray-700 data-[state=active]:text-gray-900">Security</TabsTrigger>
            </TabsList>
          </div>

          {/* Live Tracking Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Real-Time Truck Monitoring</CardTitle>
                    <CardDescription>Live tracking of agricultural transport vehicles</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search trucks..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="pl-9 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trucks.map((truck) => (
                    <div key={truck.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-lg">{truck.licensePlate}</h3>
                            <Badge className={getStatusColor(truck.status)}>
                              {truck.status === 'active' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                              {truck.status === 'alert' && <AlertTriangle className="w-3 h-3 mr-1" />}
                              {truck.status === 'delivered' && <Truck className="w-3 h-3 mr-1" />}
                              {truck.status.charAt(0).toUpperCase() + truck.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <div>
                                <p className="font-medium">Current Location</p>
                                <p className="text-gray-600">{truck.currentLocation}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Thermometer className={`w-4 h-4 ${truck.temperature > 30 ? 'text-red-500' : 'text-green-500'}`} />
                              <div>
                                <p className="font-medium">Temperature</p>
                                <p className={truck.temperature > 30 ? 'text-red-600' : 'text-green-600'}>
                                  {truck.temperature}°C
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Scale className="w-4 h-4 text-gray-500" />
                              <div>
                                <p className="font-medium">Weight</p>
                                <p className="text-gray-600">{truck.weight} kg</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <div>
                                <p className="font-medium">ETA</p>
                                <p className="text-gray-600">{truck.estimatedArrival}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            <p><strong>Farmer:</strong> {truck.farmerName} ({truck.farmerId})</p>
                            <p><strong>Crop:</strong> {truck.cropType} | <strong>Destination:</strong> {truck.destination}</p>
                            <p><strong>Last Update:</strong> {truck.lastUpdate}</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="shrink-0">
                          <Eye className="w-4 h-4 mr-2" />
                          Track
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crop Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Crop Approval Requests</CardTitle>
                <CardDescription>Review and approve farmer crop submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cropRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="space-y-3 flex-1 min-w-0">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-lg">{request.cropType} - {request.variety}</h3>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status === 'approved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                              {request.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                              {request.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-gray-700">Farmer</p>
                              <p className="text-gray-600">{request.farmerName}</p>
                              <p className="text-xs text-gray-500">ID: {request.farmerId}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">Quantity</p>
                              <p className="text-gray-600">{request.quantity} kg</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">Expected Price</p>
                              <p className="text-gray-600">₹{request.expectedPrice}/kg</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">Quality Grade</p>
                              <p className="text-gray-600">Grade {request.qualityGrade}</p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded text-sm">
                            <p><strong>Location:</strong> {request.location}</p>
                            <p><strong>Harvest Date:</strong> {new Date(request.harvestDate).toLocaleDateString()}</p>
                            <p><strong>Submitted:</strong> {new Date(request.submittedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        {request.status === 'pending' && (
                          <div className="flex flex-col space-y-2 sm:ml-4 w-full sm:w-auto">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleApproveRequest(request.id)}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRejectRequest(request.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Requests Approved</span>
                      <span className="text-2xl font-bold text-green-600">45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Active Deliveries</span>
                      <span className="text-2xl font-bold text-blue-600">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Temperature Alerts</span>
                      <span className="text-2xl font-bold text-red-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Successful Deliveries</span>
                      <span className="text-2xl font-bold text-emerald-600">67</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Maharashtra</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Karnataka</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-3/5"></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Punjab</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-600 h-2 rounded-full w-1/2"></div>
                        </div>
                        <span className="text-sm font-medium">50%</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Tamil Nadu</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full w-2/5"></div>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    <span>Security Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 border-l-4 border-red-500 bg-red-50 rounded">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">Weight Discrepancy Detected</p>
                        <p className="text-sm text-red-600">Truck MH12AB1234 - Expected: 500kg, Current: 450kg</p>
                        <p className="text-xs text-red-500">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                      <Thermometer className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">Temperature Alert</p>
                        <p className="text-sm text-yellow-600">Cold chain breach in truck KA05CD5678</p>
                        <p className="text-xs text-yellow-500">30 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">GPS Tracking System</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Temperature Monitoring</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Weight Sensors</span>
                      <Badge className="bg-yellow-100 text-yellow-800">1 Offline</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Communication Network</span>
                      <Badge className="bg-green-100 text-green-800">Stable</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}