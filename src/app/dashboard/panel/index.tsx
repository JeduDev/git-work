'use client'
import React from 'react'
import Navigator from './Navigator'
import Overview from './Overview'
import useDocumentStore from '../stores/documentStore';
import DocumentView from './DocumentView';

export default function Panel() {

  return (
    <main className="w-full h-screen select-none">
      <Navigator />
      <Overview />
      <DocumentView />
    </main>
  )
}
