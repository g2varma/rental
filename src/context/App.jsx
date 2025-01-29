// /app/context/AppConfigContext.jsx

"use client";

import { AUTH_GET } from "@/action";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppConfigContext = createContext();

// Create a provider component
export const AppConfigProvider = ({ children }) => {
  const [appConfig, setAppConfig] = useState({
    propertyTypes: [],
    availableLocations: [],
    amenities: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appConfig from the API
  useEffect(() => {
    const fetchAppConfig = async () => {
      // Make multiple API requests in parallel
      try {
        const propertyTypesPromise = AUTH_GET("/v2/internal/listing/filter/property-type");
        const locationsPromise = AUTH_GET("/v2/internal/listing/filter/location");
        const amenitiesPromise = AUTH_GET("/v2/internal/listing/filter/amenities");

        // Wait for all requests to complete
        const [propertyTypesData, locationsData, amenitiesData] = await Promise.all([
          propertyTypesPromise,
          locationsPromise,
          amenitiesPromise,
        ]);

        // Update state with the fetched data
        setAppConfig({
          propertyTypes: propertyTypesData || [],
          availableLocations: locationsData || [],
          amenities: amenitiesData || [],
        });
      } catch (err) {
        console.error("Error fetching appConfig data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppConfig();
  }, []);

  const value = { ...appConfig, loading, error };
  return (
    <AppConfigContext.Provider value={value}>
      {children}
    </AppConfigContext.Provider>
  );
};

// Custom hook to use the AppConfigContext
export const useAppConfig = () => useContext(AppConfigContext);
