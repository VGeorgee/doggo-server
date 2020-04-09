#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>
#include <math.h>

int main(){
    char s[10000];
    char first;
    int length;
    int number;
      while (scanf("%s", &s) != EOF){
         int max = s[0];
         length = 0;
         number = 0;
            for (int i = 0; i < strlen(s); i++){
                if (s[i] > max){
                    max = s[i];
                    length = i;
                    number = i;
                   }
         } first = s[0];
         for (int i = 1; i < length + 1; i++){
           if (first > s[i]){
               number--;
              }else
              {
              first = s[i];
              }
        } printf("%d\n", number + 1);
    } return 0;
}