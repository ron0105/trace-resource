
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminUsers = () => {
  const { toast } = useToast();

  const handleAssignRole = (userId: string, role: string) => {
    toast({
      title: "Role Assigned",
      description: `User ${userId} has been assigned as ${role}`,
    });
  };

  return (
    <MainLayout pageTitle="User Management">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user accounts and roles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { 
                    id: "USR001", 
                    name: "John Developer", 
                    email: "john@devcorp.com",
                    role: "Developer",
                    status: "Active",
                    joined: "2023-01-15"
                  },
                  { 
                    id: "USR002", 
                    name: "Sarah Recycler", 
                    email: "sarah@ecorecycle.com",
                    role: "Recycler",
                    status: "Active",
                    joined: "2023-02-10"
                  },
                  { 
                    id: "USR003", 
                    name: "Michael Admin", 
                    email: "michael@trace.com",
                    role: "Admin",
                    status: "Active",
                    joined: "2022-11-05"
                  },
                  { 
                    id: "USR004", 
                    name: "Emma Reviewer", 
                    email: "emma@trace.com",
                    role: "Reviewer",
                    status: "Active",
                    joined: "2023-03-20"
                  },
                  { 
                    id: "USR005", 
                    name: "New User", 
                    email: "new@company.com",
                    role: "Unassigned",
                    status: "Pending",
                    joined: "2023-05-18"
                  }
                ].map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        {user.role === "Unassigned" ? (
                          <Button 
                            size="sm"
                            onClick={() => handleAssignRole(user.id, "Reviewer")}
                          >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Assign Role
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <UserCheck className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Reviewer Assignments</CardTitle>
              <CardDescription>Manage compliance reviewer assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Assigned Clients</TableHead>
                    <TableHead>Workload</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Emma Reviewer", clients: 5, workload: "Medium" },
                    { name: "David Reviewer", clients: 8, workload: "High" },
                    { name: "Lisa Reviewer", clients: 3, workload: "Low" }
                  ].map((reviewer, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{reviewer.name}</TableCell>
                      <TableCell>{reviewer.clients} clients</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          reviewer.workload === 'Low' ? 'bg-green-100 text-green-800' : 
                          reviewer.workload === 'Medium' ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {reviewer.workload}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Assignments</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent User Activities</CardTitle>
              <CardDescription>Recent user actions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "John Developer", action: "Submitted EPR form", time: "2 hours ago" },
                  { user: "Emma Reviewer", action: "Approved WMUP submission", time: "4 hours ago" },
                  { user: "Michael Admin", action: "Generated compliance report", time: "Yesterday" },
                  { user: "Sarah Recycler", action: "Updated material certificates", time: "Yesterday" }
                ].map((activity, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminUsers;
