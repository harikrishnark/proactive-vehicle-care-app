import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { X, Maximize, AlertCircle } from 'lucide-react-native';

export default function ScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const [apiKey, setApiKey] = useState('sk-fake-key-for-testing'); // Mock input for UI sake

  // Call out to the Backend AI Pipeline
  const handleScan = async () => {
    if (scanning || diagnosis) return;
    setScanning(true);

    try {
      // Send mock base64 image data to FastAPI
      const response = await fetch("http://192.168.8.181:8000/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_base64: "data:image/jpeg;base64,iVBORw0KGg...",
          api_key: apiKey
        })
      });
      
      const data = await response.json();
      
      if (data.status === "success") {
        setDiagnosis(data.diagnosis);
      } else {
        setDiagnosis({
          issue: "System Error",
          severity: "Unknown",
          action: data.message,
          code: "APP-01"
        });
      }
    } catch (e) {
      setDiagnosis({
        issue: "Network Error",
        severity: "Critical",
        action: "Cannot reach the Cloud Diagnostics Server. Check your network.",
        code: "NET-04"
      });
    } finally {
      setScanning(false);
    }
  };

  const resetScanner = () => {
    setDiagnosis(null);
    setScanning(false);
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing="back"
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          {/* Top Controls */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
              <X color="#fff" size={24} />
            </TouchableOpacity>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>BETA: AR VISION 1.0</Text>
            </View>
          </View>

          {/* Center Targeting Reticle */}
          <View style={styles.reticleContainer}>
             <Maximize color="rgba(255,255,255,0.4)" size={250} strokeWidth={1} />
          </View>

          {/* Bottom Action Area */}
          <View style={styles.bottomArea}>
            
            {/* 1. Default Scanner State */}
            {!scanning && !diagnosis && (
              <View style={styles.instructionCard}>
                <Text style={styles.instructionTitle}>Point at Dashboard Warning</Text>
                <Text style={styles.instructionDesc}>Ensure the warning light is clearly visible inside the frame.</Text>
                <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
                  <Text style={styles.scanButtonText}>Analyze Warning</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* 2. Scanning / Analyzing State */}
            {scanning && (
              <View style={styles.analyzingCard}>
                <ActivityIndicator size="large" color="#0066B1" />
                <Text style={styles.analyzingText}>AI analyzing dashboard imagery...</Text>
              </View>
            )}

            {/* 3. Diagnosis Result State */}
            {diagnosis && (
              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <AlertCircle color="#F5A623" size={24} />
                  <Text style={styles.resultTitle}>{diagnosis.issue}</Text>
                </View>
                <Text style={styles.resultCode}>BMW Internal Code: {diagnosis.code}</Text>
                <Text style={styles.resultAction}>{diagnosis.action}</Text>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Book Service Appointment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.resetButton} onPress={resetScanner}>
                  <Text style={styles.resetButtonText}>Scan Another Issue</Text>
                </TouchableOpacity>
              </View>
            )}

          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#0066B1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(0, 102, 177, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  reticleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomArea: {
    padding: 20,
    paddingBottom: 40,
  },
  instructionCard: {
    backgroundColor: 'rgba(17, 17, 17, 0.95)',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  instructionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionDesc: {
    color: '#aaa',
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22,
  },
  scanButton: {
    backgroundColor: '#0066B1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  analyzingCard: {
    backgroundColor: 'rgba(17, 17, 17, 0.95)',
    borderRadius: 20,
    padding: 40,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  analyzingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    fontWeight: '500',
  },
  resultCard: {
    backgroundColor: 'rgba(17, 17, 17, 0.95)',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  resultCode: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 15,
  },
  resultAction: {
    color: '#dedede',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 25,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  }
});
