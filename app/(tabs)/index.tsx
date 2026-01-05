import { StyleSheet, ScrollView, TouchableOpacity, View, useWindowDimensions, ActivityIndicator, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState, useMemo } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { api, Game } from '@/services/api';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const gameList = await api.getGames();
      setGames(gameList);
    } catch (err) {
      console.error('Failed to load games:', err);
      setError('加载游戏列表失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 过滤游戏列表
  const filteredGames = useMemo(() => {
    if (!searchText.trim()) {
      return games;
    }
    const keyword = searchText.toLowerCase().trim();
    return games.filter(game =>
      game.name.toLowerCase().includes(keyword) ||
      game.description?.toLowerCase().includes(keyword) ||
      game.gameKey.toLowerCase().includes(keyword)
    );
  }, [games, searchText]);

  // 计算卡片布局：使用容器实际宽度
  const getCardLayout = (index: number) => {
    // 使用容器的实际最大宽度，而不是窗口宽度
    const containerWidth = Math.min(width, 1200);
    const padding = 40; // scrollContent 的左右 padding (20 + 20)
    const gap = 16;

    if (containerWidth >= 1200) {
      // 大屏幕：3列，第一个卡片占2列
      const availableWidth = containerWidth - padding;
      const baseWidth = (availableWidth - gap * 2) / 3;
      if (index === 0) {
        return { width: baseWidth * 2 + gap, height: baseWidth * 1.2 };
      }
      return { width: baseWidth, height: baseWidth };
    } else if (containerWidth >= 768) {
      // 平板：2列，每3个游戏中第一个占2列
      const availableWidth = containerWidth - padding;
      const baseWidth = (availableWidth - gap) / 2;
      if (index % 3 === 0) {
        return { width: baseWidth * 2 + gap, height: baseWidth * 0.8 };
      }
      return { width: baseWidth, height: baseWidth };
    } else {
      // 移动端：2列，第一个占满宽
      const availableWidth = containerWidth - padding;
      const baseWidth = (availableWidth - gap) / 2;
      if (index === 0) {
        return { width: baseWidth * 2 + gap, height: baseWidth * 0.9 };
      }
      return { width: baseWidth, height: baseWidth };
    }
  };

  const handleGamePress = (gameKey: string) => {
    // @ts-ignore
    router.push(`/games/${gameKey}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <ThemedText type="title">小游戏合集</ThemedText>
          <ThemedText style={styles.subtitle}>选择一个游戏开始玩吧</ThemedText>
        </View>

        {/* 搜索框 */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="搜索游戏..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchText('')}
            >
              <ThemedText style={styles.clearButtonText}>✕</ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <ThemedText style={styles.loadingText}>加载中...</ThemedText>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
            <TouchableOpacity style={styles.retryButton} onPress={loadGames}>
              <ThemedText style={styles.retryButtonText}>重试</ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {!loading && !error && (
          <>
            {/* 搜索结果提示 */}
            {searchText.trim() && (
              <View style={styles.searchResultHint}>
                <ThemedText style={styles.searchResultText}>
                  找到 {filteredGames.length} 个游戏
                </ThemedText>
              </View>
            )}

            {filteredGames.length > 0 ? (
              <View style={styles.gamesGrid}>
                {filteredGames.map((game, index) => {
                  const layout = getCardLayout(index);
                  const isLarge = index === 0 || (width >= 768 && index % 3 === 0);

                  return (
                    <TouchableOpacity
                      key={game.gameKey}
                      style={[
                        styles.gameCard,
                        {
                          width: layout.width,
                          height: layout.height,
                          backgroundColor: game.color,
                        },
                        isLarge && styles.largeCard,
                      ]}
                      onPress={() => handleGamePress(game.gameKey)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.gameIcon, isLarge && styles.largeGameIcon]}>
                        <ThemedText style={[styles.iconText, isLarge && styles.largeIconText]}>
                          {game.icon}
                        </ThemedText>
                      </View>
                      <ThemedText
                        type="defaultSemiBold"
                        style={[styles.gameName, isLarge && styles.largeGameName]}
                      >
                        {game.name}
                      </ThemedText>
                      <ThemedText style={[styles.gameDescription, isLarge && styles.largeGameDescription]}>
                        {game.description}
                      </ThemedText>
                      {isLarge && (
                        <View style={styles.featuredBadge}>
                          <ThemedText style={styles.featuredText}>推荐</ThemedText>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : searchText.trim() ? (
              <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyIcon}>🔍</ThemedText>
                <ThemedText style={styles.emptyText}>
                  没有找到匹配的游戏
                </ThemedText>
                <TouchableOpacity onPress={() => setSearchText('')}>
                  <ThemedText style={styles.clearSearchText}>清除搜索</ThemedText>
                </TouchableOpacity>
              </View>
            ) : null}
          </>
        )}

        <View style={styles.comingSoon}>
          <ThemedText style={styles.comingSoonIcon}>🎁</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.comingSoonTitle}>
            更多游戏即将上线
          </ThemedText>
          <ThemedText style={styles.comingSoonText}>
            我们正在努力开发更多有趣的小游戏，敬请期待！
          </ThemedText>
        </View>
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
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 1200,
  },
  header: {
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999',
  },
  searchResultHint: {
    marginBottom: 12,
  },
  searchResultText: {
    fontSize: 14,
    opacity: 0.7,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 12,
  },
  clearSearchText: {
    fontSize: 14,
    color: '#3b82f6',
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 16,
    width: '100%',
  },
  gameCard: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  largeCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  gameIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  largeGameIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 0,
    marginRight: 20,
  },
  iconText: {
    fontSize: 32,
  },
  largeIconText: {
    fontSize: 48,
  },
  gameName: {
    fontSize: 20,
    marginBottom: 4,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  largeGameName: {
    fontSize: 28,
    marginBottom: 8,
  },
  gameDescription: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.95,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  largeGameDescription: {
    fontSize: 16,
    maxWidth: '70%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  featuredText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
  comingSoon: {
    marginTop: 32,
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    alignItems: 'center',
  },
  comingSoonIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  comingSoonTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    opacity: 0.7,
  },
  errorContainer: {
    padding: 40,
    alignItems: 'center',
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
