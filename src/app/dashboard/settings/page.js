'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const [exists, setExists] = useState(false);

  const [formData, setFormData] = useState({
    storeName: '',
    storeEmail: '',
    storePhone: '',
    storeAddress: '',

    logo: '',
    favicon: '',

    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',

    googleAnalyticsId: '',
    googleTagManagerId: '',
    facebookPixelId: '',

    googleVerificationCode: '',
    bingVerificationCode: '',
  });

  // GET SETTINGS

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    try {
      const res = await axios.get('/api/settings');

      if (res.data.data) {
        setExists(true);

        setFormData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,

      [name]: value,
    });
  };

  // SAVE SETTINGS

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let res;

      if (exists) {
        res = await axios.put('/api/settings', formData);
      } else {
        res = await axios.post('/api/settings', formData);
      }

      if (res.data.success) {
        toast.success('Settings saved successfully');

        setExists(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Website Settings</h1>

        <p className="text-gray-500">
          Manage website information, SEO and analytics
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-xl border bg-white p-6 dark:bg-gray-900"
      >
        {/* Store Information */}

        <Section title="Store Information">
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Store Name"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
            />

            <Input
              label="Store Email"
              name="storeEmail"
              value={formData.storeEmail}
              onChange={handleChange}
            />

            <Input
              label="Store Phone"
              name="storePhone"
              value={formData.storePhone}
              onChange={handleChange}
            />

            <Input
              label="Logo URL"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
            />

            <Input
              label="Favicon URL"
              name="favicon"
              value={formData.favicon}
              onChange={handleChange}
            />
          </div>

          <Textarea
            label="Store Address"
            name="storeAddress"
            value={formData.storeAddress}
            onChange={handleChange}
          />
        </Section>

        {/* SEO */}

        <Section title="SEO Settings">
          <Input
            label="Meta Title"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
          />

          <Textarea
            label="Meta Description"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
          />

          <Input
            label="Meta Keywords"
            name="metaKeywords"
            value={formData.metaKeywords}
            onChange={handleChange}
          />
        </Section>

        {/* Analytics */}

        <Section title="Analytics">
          <Input
            label="Google Analytics ID"
            name="googleAnalyticsId"
            value={formData.googleAnalyticsId}
            onChange={handleChange}
          />

          <Input
            label="Google Tag Manager ID"
            name="googleTagManagerId"
            value={formData.googleTagManagerId}
            onChange={handleChange}
          />

          <Input
            label="Facebook Pixel ID"
            name="facebookPixelId"
            value={formData.facebookPixelId}
            onChange={handleChange}
          />
        </Section>

        {/* Verification */}

        <Section title="Search Engine Verification">
          <Input
            label="Google Verification Code"
            name="googleVerificationCode"
            value={formData.googleVerificationCode}
            onChange={handleChange}
          />

          <Input
            label="Bing Verification Code"
            name="bingVerificationCode"
            value={formData.bingVerificationCode}
            onChange={handleChange}
          />
        </Section>

        <button
          disabled={loading}
          className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>

      <input
        name={name}

        value={value || ''}

        onChange={onChange}

        className="w-full rounded-lg border px-3 py-2"
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>

      <textarea
        name={name}

        value={value || ''}

        onChange={onChange}

        rows="4"

        className="w-full rounded-lg border p-3"
      />
    </div>
  );
}
