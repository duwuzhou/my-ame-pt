import { StyleSheet, ScrollView, TouchableOpacity, View, useWindowDimensions, ActivityIndicator, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState, useMemo } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { api, Game, Tag } from '@/services/api';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [games, setGames] = useState<Game[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [gameList, tagList] = await Promise.all([
        api.getGamesWithTags(),
        api.getTags()
      ]);
      setGames(gameList);
      setTags(tagList);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('加载数据失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 过滤游戏列表
  const filteredGames = useMemo(() => {
    let result = games;

    // 按标签筛选
    if (selectedTag) {
      result = result.filter(game =>
        game.tags?.some(tag => tag.slug === selectedTag)
      );
    }

    // 按搜索关键词筛选
    if (searchText.trim()) {
      const keyword = searchText.toLowerCase().trim();
      result = result.filter(game =>
        game.name.toLowerCase().includes(keyword) ||
        game.description?.toLowerCase().includes(keyword) ||
        game.gameKey.toLowerCase().includes(keyword)
      );
    }

    return result;
  }, [games, selectedTag, searchText]);

  // 计算卡片布局：使用容器实际宽度，优化移动端适配
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
    } else if (containerWidth >= 480) {
      // 中等移动端：2列，第一个占满宽
      const availableWidth = containerWidth - padding;
      const baseWidth = (availableWidth - gap) / 2;
      if (index === 0) {
        return { width: availableWidth, height: baseWidth * 0.9 };
      }
      return { width: baseWidth, height: baseWidth };
    } else {
      // 小屏移动端：2列，所有卡片统一大小
      const availableWidth = containerWidth - padding;
      const baseWidth = (availableWidth - gap) / 2;
      return { width: baseWidth, height: baseWidth * 1.1 };
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

        {/* 标签筛选 */}
        {!loading && tags.length > 0 && (
          <View style={styles.tagsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tagsScrollContent}
            >
              <TouchableOpacity
                style={[styles.tagChip, !selectedTag && styles.tagChipActive]}
                onPress={() => setSelectedTag(null)}
                activeOpacity={0.7}
              >
                <ThemedText style={[styles.tagText, !selectedTag && styles.tagTextActive]}>
                  全部
                </ThemedText>
              </TouchableOpacity>
              {tags.map((tag) => (
                <TouchableOpacity
                  key={tag.id}
                  style={[
                    styles.tagChip,
                    selectedTag === tag.slug && styles.tagChipActive,
                    { borderColor: tag.color }
                  ]}
                  onPress={() => setSelectedTag(selectedTag === tag.slug ? null : tag.slug)}
                  activeOpacity={0.7}
                >
                  <ThemedText style={styles.tagIcon}>{tag.icon}</ThemedText>
                  <ThemedText style={[
                    styles.tagText,
                    selectedTag === tag.slug && styles.tagTextActive
                  ]}>
                    {tag.name}
                  </ThemedText>
                  {tag.gameCount !== undefined && (
                    <ThemedText style={styles.tagCount}>({tag.gameCount})</ThemedText>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <ThemedText style={styles.loadingText}>加载中...</ThemedText>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
            <TouchableOpacity style={styles.retryButton} onPress={loadData}>
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
                  // 只在较大屏幕上使用大卡片布局
                  const isLarge = width >= 480 && (index === 0 || (width >= 768 && index % 3 === 0));

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
                      {/* 游戏标签 */}
                      {game.tags && game.tags.length > 0 && !isLarge && (
                        <View style={styles.gameTagsContainer}>
                          {game.tags.slice(0, 2).map((tag) => (
                            <View
                              key={tag.id}
                              style={[styles.gameTag, { backgroundColor: tag.color + '30', borderColor: tag.color }]}
                            >
                              <ThemedText style={styles.gameTagText}>{tag.name}</ThemedText>
                            </View>
                          ))}
                        </View>
                      )}
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
  // 标签筛选样式
  tagsContainer: {
    marginBottom: 20,
  },
  tagsScrollContent: {
    paddingRight: 20,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(128, 128, 128, 0.3)',
    marginRight: 10,
  },
  tagChipActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  tagIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  tagTextActive: {
    color: '#ffffff',
    opacity: 1,
  },
  tagCount: {
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.6,
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
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  largeCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  gameIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  largeGameIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 0,
    marginRight: 16,
  },
  iconText: {
    fontSize: 28,
  },
  largeIconText: {
    fontSize: 40,
  },
  gameName: {
    fontSize: 18,
    marginBottom: 4,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  largeGameName: {
    fontSize: 24,
    marginBottom: 6,
    textAlign: 'left',
  },
  gameDescription: {
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.95,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    lineHeight: 18,
  },
  largeGameDescription: {
    fontSize: 15,
    maxWidth: '70%',
    textAlign: 'left',
    lineHeight: 20,
  },
  // 游戏卡片标签样式
  gameTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  gameTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
  },
  gameTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
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
