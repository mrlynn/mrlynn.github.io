'use client';

import { Container } from '@mui/material';
import PageHeader from '../../../components/PageHeader';
import MongoDBIntrospector from '../../../components/tools/MongoDBIntrospector';

export default function IntrospectPage() {
  return (
    <>
      <PageHeader 
        title="MongoDB Schema Introspector" 
        description="Analyze and visualize MongoDB database schemas, relationships, and compare database structures"
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MongoDBIntrospector />
      </Container>
    </>
  );
} 