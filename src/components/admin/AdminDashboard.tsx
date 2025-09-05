
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SchoolsManagement from './SchoolsManagement';
import ArticlesTable from './ArticlesTable';
import CommentsTable from './CommentsTable';
import ContactMessagesTable from './ContactMessagesTable';
import InscriptionsTable from './InscriptionsTable';
import MessagesTable from './MessagesTable';
import UserProfilesTable from './UserProfilesTable';
import PropertiesManagement from './PropertiesManagement';
import PropertyCommentsTable from './PropertyCommentsTable';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Tableau de bord administrateur
        </h1>
        <p className="text-gray-600">
          Gérez toutes les données de votre plateforme depuis cette interface
        </p>
      </div>

      <Tabs defaultValue="schools" className="w-full">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="schools">Établissements</TabsTrigger>
          <TabsTrigger value="properties">Immobilier</TabsTrigger>
          <TabsTrigger value="property-comments">Commentaires Immo</TabsTrigger>
          <TabsTrigger value="inscriptions">Inscriptions</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="comments">Commentaires</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
        </TabsList>

        <TabsContent value="schools">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des établissements</CardTitle>
            </CardHeader>
            <CardContent>
              <SchoolsManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des propriétés immobilières</CardTitle>
            </CardHeader>
            <CardContent>
              <PropertiesManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="property-comments">
          <Card>
            <CardHeader>
              <CardTitle>Commentaires sur les propriétés</CardTitle>
            </CardHeader>
            <CardContent>
              <PropertyCommentsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Inscriptions des étudiants</CardTitle>
            </CardHeader>
            <CardContent>
              <InscriptionsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Messages reçus</CardTitle>
            </CardHeader>
            <CardContent>
              <MessagesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Messages de contact</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactMessagesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="articles">
          <Card>
            <CardHeader>
              <CardTitle>Articles du blog</CardTitle>
            </CardHeader>
            <CardContent>
              <ArticlesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle>Commentaires</CardTitle>
            </CardHeader>
            <CardContent>
              <CommentsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Profils utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <UserProfilesTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
