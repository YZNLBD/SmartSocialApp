import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit"; // استيراد مكتبة الرسوم البيانية
import { fetchSocialStats, syncData } from '../../data/StatsApi';
import { SocialStats } from '../../domain/entities/SocialStats';

const DashboardScreen = () => {
  const [stats, setStats] = useState<SocialStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const screenWidth = Dimensions.get("window").width;

  const loadData = async () => {
    try {
      const data = await fetchSocialStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncData(); 
      await loadData(); 
      // تمت إزالة Alert.alert ليكون التحديث صامتاً واحترافياً
    } catch (error) {
      console.error("Sync failed", error);
      setSyncing(false);
    }
  };

  // إعداد بيانات الرسم البياني
  const chartData = {
    labels: stats.map(s => s.platform),
    datasets: [{ data: stats.map(s => s.followers) }]
  };

  if (loading) return <ActivityIndicator size="large" color="#2196F3" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Analytics Dashboard</Text>

      {/* عرض الرسم البياني فقط في حال وجود بيانات */}
      {stats.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>Followers Comparison</Text>
          <BarChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, 0.7)`,
              style: { borderRadius: 16 },
            }}
            style={{ marginVertical: 8, borderRadius: 16 }}
            fromZero={true}
            showValuesOnTopOfBars={true}
          />
        </View>
      )}

      <TouchableOpacity 
        style={[styles.syncButton, syncing && styles.disabledButton]} 
        onPress={handleSync}
        disabled={syncing}
      >
        <Text style={styles.syncButtonText}>
          {syncing ? "🔄 Updating Data..." : "🔄 Sync with Social Media"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={stats}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
               <Text style={styles.platformName}>{item.platform}</Text>
               <Text style={styles.followerCount}>{item.followers.toLocaleString()} 👤</Text>
            </View>
            <Text style={styles.subText}>Engagement Rate: {item.engagementRate}%</Text>
            
            {item.aiAdvice && (
              <View style={styles.aiBox}>
                <Text style={styles.aiTitle}>🤖 AI Insight:</Text>
                <Text style={styles.aiText}>{item.aiAdvice}</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f2f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 30, marginBottom: 15, textAlign: 'center', color: '#1a1a1a' },
  chartContainer: { backgroundColor: '#fff', borderRadius: 16, padding: 10, marginBottom: 20, elevation: 4 },
  chartLabel: { fontSize: 16, fontWeight: '600', marginBottom: 5, marginLeft: 5, color: '#444' },
  syncButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  syncButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  disabledButton: { backgroundColor: '#BDBDBD' },
  card: { backgroundColor: '#fff', padding: 18, borderRadius: 15, marginBottom: 15, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  platformName: { fontSize: 18, fontWeight: 'bold', color: '#2196F3' },
  followerCount: { fontSize: 16, fontWeight: '600', color: '#333' },
  subText: { fontSize: 14, color: '#666' },
  aiBox: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f0f7ff',
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#2196F3',
  },
  aiTitle: { fontSize: 14, fontWeight: 'bold', color: '#0D47A1', marginBottom: 4 },
  aiText: { fontSize: 13, color: '#1565C0', lineHeight: 18 },
});

export default DashboardScreen;