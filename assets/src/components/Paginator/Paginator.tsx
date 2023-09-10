import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PaginateType } from './Paginator.type';

type PaginatorProps = {
  paginate: PaginateType,
  path: string;
  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;  // 追加
  onLast: () => void; 
}

const Paginator: React.FC<PaginatorProps> = ({ 
  paginate,
  onNext,
  onPrevious,
  onFirst,
  onLast,
}) => {
  const currentPage = paginate.currentPage ?? 1;
  const lastPage = paginate.lastPage ?? 1;
  return (
    <>
      { lastPage > 1 ? 
        <View style={styles.container}>
          <TouchableOpacity onPress={onFirst} disabled={currentPage === 1} style={[styles.button, currentPage === 1 && styles.disabledButton]}>
            <Text style={[styles.pageText, currentPage === 1 && styles.disabledText]}>最初へ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPrevious} disabled={currentPage <= 1} style={[styles.button, currentPage <= 1 && styles.disabledButton]}>
            <Text style={[styles.pageText, currentPage <= 1 && styles.disabledText]}>前へ</Text>
          </TouchableOpacity>
          <Text style={styles.currentPageText}>{currentPage} / {lastPage}</Text>
          <TouchableOpacity onPress={onNext} disabled={currentPage >= lastPage} style={[styles.button, currentPage >= lastPage && styles.disabledButton]}>
            <Text style={[styles.pageText, currentPage >= lastPage && styles.disabledText]}>次へ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLast} disabled={currentPage === lastPage} style={[styles.button, currentPage === lastPage && styles.disabledButton]}>
            <Text style={[styles.pageText, currentPage === lastPage && styles.disabledText]}>最後へ</Text>
          </TouchableOpacity>
        </View>
        : <></>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',  // 'space-between'から変更してボタン間のスペースを均等にします
    alignItems: 'center',
    padding: 8,  // paddingを16から8に変更
  },
  pageText: {
    fontSize: 14,  // フォントサイズを16から14に変更
    color: '#FFF',
  },
  currentPageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.5)', 
  },
  button: {
    paddingVertical: 6,  // paddingを8から6に変更
    paddingHorizontal: 12,  // paddingを16から12に変更
    backgroundColor: '#3498db',
    borderRadius: 5,
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  disabledButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.5)',
  }
});


export default Paginator;
