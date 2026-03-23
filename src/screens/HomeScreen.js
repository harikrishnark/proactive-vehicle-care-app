import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Camera, AlertTriangle, CheckCircle, CarFront, ChevronRight } from 'lucide-react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Widget */}
        <View style={styles.headerWidget}>
          <CarFront color="#0066B1" size={40} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.vehicleName}>BMW M340i xDrive</Text>
            <Text style={styles.vehicleStatus}>Connected • Up to date</Text>
          </View>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity 
          style={styles.arCalloutButton}
          onPress={() => navigation.navigate('Scanner')}
        >
          <View style={styles.arCalloutContent}>
            <Camera color="#fff" size={28} />
            <View style={styles.arCalloutText}>
              <Text style={styles.arCalloutTitle}>AR Vision Scanner</Text>
              <Text style={styles.arCalloutSubtitle}>Identify dashboard warnings instantly</Text>
            </View>
          </View>
          <ChevronRight color="#fff" size={24} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>PREDICTIVE MAINTENANCE</Text>

        {/* Predictive Widgets */}
        <View style={styles.widgetGrid}>
          
          <View style={[styles.widget, styles.widgetWarning]}>
            <View style={styles.widgetHeader}>
              <AlertTriangle color="#F5A623" size={20} />
              <Text style={styles.widgetTitleWarning}>Diesel Particulate</Text>
            </View>
            <Text style={styles.widgetValue}>Soot Limit Reached</Text>
            <Text style={styles.widgetSubtext}>Diagnostic required immediately</Text>
          </View>

          <View style={styles.widget}>
            <View style={styles.widgetHeader}>
              <CheckCircle color="#7ED321" size={20} />
              <Text style={styles.widgetTitle}>Brake Pads (Front)</Text>
            </View>
            <Text style={styles.widgetValue}>5,200 km</Text>
            <Text style={styles.widgetSubtext}>Estimated remaining life</Text>
          </View>

          <View style={styles.widget}>
            <View style={styles.widgetHeader}>
              <CheckCircle color="#7ED321" size={20} />
              <Text style={styles.widgetTitle}>Engine Oil</Text>
            </View>
            <Text style={styles.widgetValue}>12,000 km</Text>
            <Text style={styles.widgetSubtext}>Next service: Oct 2026</Text>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#111111',
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  headerTextContainer: {
    marginLeft: 15,
  },
  vehicleName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  vehicleStatus: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  arCalloutButton: {
    backgroundColor: '#0066B1',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 35,
    shadowColor: '#0066B1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  arCalloutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  arCalloutText: {
    marginLeft: 15,
  },
  arCalloutTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  arCalloutSubtitle: {
    color: '#rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 2,
  },
  sectionTitle: {
    color: '#666',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 15,
  },
  widgetGrid: {
    gap: 15,
  },
  widget: {
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  widgetWarning: {
    borderColor: '#4A3515',
    backgroundColor: '#1A130A',
  },
  widgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  widgetTitle: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  widgetTitleWarning: {
    color: '#F5A623',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  widgetValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
  },
  widgetSubtext: {
    color: '#666',
    fontSize: 13,
    marginTop: 5,
  },
});
