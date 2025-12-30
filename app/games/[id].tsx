import { useLocalSearchParams, Stack } from 'expo-router';
import { StyleSheet, View, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// 游戏配置
const GAMES: Record<string, { name: string; htmlFile: string }> = {
  '2048': {
    name: '2048',
    htmlFile: '/html/2048.html',
  },
  'tiaoyue': {
    name: '跳跃前进',
    htmlFile: '/html/tiaoyue.html',
  },
  'tydxn': {
    name: '跳跃的小鸟',
    htmlFile: '/html/tydxn.html',
  },
  'jfcz': {
    name: '见缝插针',
    htmlFile: '/html/jfcz.html',
  },
};

export default function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const game = id ? GAMES[id] : null;

  if (!game) {
    return (
      <ThemedView style={styles.centerContainer}>
        <Stack.Screen options={{ title: '游戏未找到' }} />
        <ThemedText>游戏不存在</ThemedText>
      </ThemedView>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: game.name }} />
      {Platform.OS === 'web' ? (
        <iframe
          src={game.htmlFile}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title={game.name}
        />
      ) : (
        <ThemedView style={styles.centerContainer}>
          <ThemedText>此游戏仅支持 Web 平台</ThemedText>
        </ThemedView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
