import { StyleSheet, ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// 游戏列表配置
const GAMES = [
  {
    id: '2048',
    name: '2048',
    description: '合并数字，挑战2048',
    icon: '🎮',
  },
  {
    id: 'tiaoyue',
    name: '跳跃前进',
    description: '躲避障碍，跑得更远',
    icon: '🦘',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // 计算卡片大小：每行2个，间距16，边距20
  const cardSize = (width - 40 - 16) / 2;

  const handleGamePress = (gameId: string) => {
    // @ts-ignore
    router.push(`/games/${gameId}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <ThemedText type="title">小游戏合集</ThemedText>
          <ThemedText style={styles.subtitle}>选择一个游戏开始玩吧</ThemedText>
        </View>

        <View style={styles.gamesGrid}>
          {GAMES.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={[styles.gameCard, { width: cardSize, height: cardSize }]}
              onPress={() => handleGamePress(game.id)}
              activeOpacity={0.7}
            >
              <View style={styles.gameIcon}>
                <ThemedText style={styles.iconText}>{game.icon}</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.gameName}>
                {game.name}
              </ThemedText>
              <ThemedText style={styles.gameDescription}>
                {game.description}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
    fontSize: 14,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gameCard: {
    backgroundColor: '#0ea5e9',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 32,
  },
  gameName: {
    fontSize: 20,
    marginBottom: 4,
    color: '#ffffff',
  },
  gameDescription: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.9,
    color: '#ffffff',
  },
});
