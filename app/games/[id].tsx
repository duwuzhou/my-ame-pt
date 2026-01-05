import { useLocalSearchParams, Stack } from 'expo-router';
import { StyleSheet, View, Platform, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { api, Game } from '@/services/api';

export default function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadGame(id);
    }
  }, [id]);

  const loadGame = async (gameKey: string) => {
    try {
      setLoading(true);
      setError(null);
      const gameData = await api.getGame(gameKey);
      setGame(gameData);
    } catch (err) {
      console.error('Failed to load game:', err);
      setError('加载游戏失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <Stack.Screen options={{ title: '加载中...' }} />
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>加载中...</ThemedText>
      </ThemedView>
    );
  }

  if (error || !game) {
    return (
      <ThemedView style={styles.centerContainer}>
        <Stack.Screen options={{ title: '游戏未找到' }} />
        <ThemedText style={styles.errorText}>{error || '游戏不存在'}</ThemedText>
      </ThemedView>
    );
  }

  const htmlUrl = api.getFullHtmlUrl(game.htmlUrl);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: game.name }} />
      {Platform.OS === 'web' ? (
        <iframe
          src={htmlUrl}
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
  loadingText: {
    marginTop: 12,
    opacity: 0.7,
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
  },
});
